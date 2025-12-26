/**
 * Thermal Receipt Printer Support via Web USB API
 * Supports ESC/POS compatible printers
 */

// Type declarations for Web USB API (not all browsers support this)
declare global {
  interface Navigator {
    usb?: USB;
  }
  
  interface USB {
    requestDevice(options: USBDeviceRequestOptions): Promise<USBDeviceType>;
  }
  
  interface USBDeviceRequestOptions {
    filters: Array<{ vendorId: number }>;
  }
  
  interface USBDeviceType {
    open(): Promise<void>;
    close(): Promise<void>;
    selectConfiguration(configurationValue: number): Promise<void>;
    claimInterface(interfaceNumber: number): Promise<void>;
    transferOut(endpointNumber: number, data: BufferSource): Promise<USBOutTransferResult>;
    configuration: USBConfiguration | null;
    opened: boolean;
  }
  
  interface USBConfiguration {
    interfaces: USBInterface[];
  }
  
  interface USBInterface {
    interfaceNumber: number;
    alternates: USBAlternateInterface[];
  }
  
  interface USBAlternateInterface {
    endpoints: USBEndpointType[];
  }
  
  interface USBEndpointType {
    endpointNumber: number;
    direction: 'in' | 'out';
    type: 'bulk' | 'interrupt' | 'isochronous';
  }
  
  interface USBOutTransferResult {
    bytesWritten: number;
    status: 'ok' | 'stall' | 'babble';
  }
}

interface PrinterDevice {
  device: USBDeviceType;
  endpointOut: USBEndpointType;
}

// ESC/POS Commands
const ESC = 0x1b;
const GS = 0x1d;

const COMMANDS = {
  INIT: [ESC, 0x40], // Initialize printer
  ALIGN_CENTER: [ESC, 0x61, 0x01],
  ALIGN_LEFT: [ESC, 0x61, 0x00],
  ALIGN_RIGHT: [ESC, 0x61, 0x02],
  BOLD_ON: [ESC, 0x45, 0x01],
  BOLD_OFF: [ESC, 0x45, 0x00],
  DOUBLE_HEIGHT: [GS, 0x21, 0x10],
  DOUBLE_WIDTH: [GS, 0x21, 0x20],
  NORMAL_SIZE: [GS, 0x21, 0x00],
  CUT_PAPER: [GS, 0x56, 0x00], // Full cut
  PARTIAL_CUT: [GS, 0x56, 0x01],
  FEED_LINES: (n: number) => [ESC, 0x64, n],
  LINE_SPACING: (n: number) => [ESC, 0x33, n],
};

class ReceiptPrinter {
  private printer: PrinterDevice | null = null;
  private isConnecting = false;

  // Check if Web USB is supported
  isSupported(): boolean {
    return 'usb' in navigator;
  }

  // Check if printer is connected
  isConnected(): boolean {
    return this.printer !== null && this.printer.device.opened;
  }

  // Connect to printer
  async connect(): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error('Web USB is not supported in this browser');
    }

    if (this.isConnecting) return false;
    this.isConnecting = true;

    try {
      // Request a USB device - common thermal printer vendor IDs
      const device = await navigator.usb.requestDevice({
        filters: [
          { vendorId: 0x0483 }, // STMicroelectronics (many POS printers)
          { vendorId: 0x0416 }, // Winbond
          { vendorId: 0x0dd4 }, // Custom printers
          { vendorId: 0x04b8 }, // Epson
          { vendorId: 0x0519 }, // Star Micronics
          { vendorId: 0x0fe6 }, // ICS
          { vendorId: 0x1fc9 }, // NXP
          { vendorId: 0x20d1 }, // Simba
          { vendorId: 0x0525 }, // Netchip
          { vendorId: 0x28e9 }, // GigaDevice
        ]
      });

      await device.open();
      
      // Select configuration and claim interface
      if (device.configuration === null) {
        await device.selectConfiguration(1);
      }
      
      const interfaceNumber = device.configuration!.interfaces[0].interfaceNumber;
      await device.claimInterface(interfaceNumber);

      // Find bulk OUT endpoint
      const alternate = device.configuration!.interfaces[0].alternates[0];
      const endpointOut = alternate.endpoints.find(e => e.direction === 'out' && e.type === 'bulk');
      
      if (!endpointOut) {
        throw new Error('No bulk OUT endpoint found');
      }

      this.printer = { device, endpointOut };
      
      // Initialize printer
      await this.sendCommand(COMMANDS.INIT);
      
      console.log('Printer connected successfully');
      return true;
    } catch (error) {
      console.error('Failed to connect to printer:', error);
      this.printer = null;
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  // Disconnect from printer
  async disconnect(): Promise<void> {
    if (this.printer) {
      try {
        await this.printer.device.close();
      } catch (error) {
        console.error('Error closing printer:', error);
      }
      this.printer = null;
    }
  }

  // Send raw command
  private async sendCommand(command: number[]): Promise<void> {
    if (!this.printer) {
      throw new Error('Printer not connected');
    }

    const data = new Uint8Array(command);
    await this.printer.device.transferOut(this.printer.endpointOut.endpointNumber, data);
  }

  // Send text
  private async sendText(text: string): Promise<void> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text + '\n');
    
    if (!this.printer) {
      throw new Error('Printer not connected');
    }

    await this.printer.device.transferOut(this.printer.endpointOut.endpointNumber, data);
  }

  // Print receipt
  async printReceipt(receipt: ReceiptData): Promise<void> {
    if (!this.isConnected()) {
      throw new Error('Printer not connected');
    }

    try {
      // Initialize
      await this.sendCommand(COMMANDS.INIT);
      await this.sendCommand(COMMANDS.LINE_SPACING(60));

      // Header - Restaurant name (centered, bold, double size)
      await this.sendCommand(COMMANDS.ALIGN_CENTER);
      await this.sendCommand(COMMANDS.BOLD_ON);
      await this.sendCommand(COMMANDS.DOUBLE_HEIGHT);
      await this.sendText(receipt.restaurantName);
      await this.sendCommand(COMMANDS.NORMAL_SIZE);
      await this.sendCommand(COMMANDS.BOLD_OFF);

      // Separator
      await this.sendText('--------------------------------');

      // Bill info
      await this.sendCommand(COMMANDS.ALIGN_LEFT);
      await this.sendText(`Table: ${receipt.tableNumber}`);
      await this.sendText(`Date: ${receipt.date}`);
      await this.sendText(`Bill #: ${receipt.billId}`);

      // Separator
      await this.sendText('--------------------------------');

      // Items header
      await this.sendCommand(COMMANDS.BOLD_ON);
      await this.sendText('Item                  Qty  Amount');
      await this.sendCommand(COMMANDS.BOLD_OFF);
      await this.sendText('--------------------------------');

      // Items
      for (const item of receipt.items) {
        const namePadded = item.name.substring(0, 20).padEnd(20);
        const qtyStr = item.qty.toString().padStart(3);
        const amountStr = item.total.toString().padStart(7);
        await this.sendText(`${namePadded} ${qtyStr} ${amountStr}`);
      }

      // Separator
      await this.sendText('--------------------------------');

      // Totals
      await this.sendCommand(COMMANDS.ALIGN_RIGHT);
      await this.sendText(`Subtotal: Rs. ${receipt.subtotal}`);
      
      if (receipt.discount > 0) {
        await this.sendText(`Discount: Rs. ${receipt.discount}`);
      }
      
      await this.sendCommand(COMMANDS.BOLD_ON);
      await this.sendCommand(COMMANDS.DOUBLE_HEIGHT);
      await this.sendText(`Total: Rs. ${receipt.total}`);
      await this.sendCommand(COMMANDS.NORMAL_SIZE);
      await this.sendCommand(COMMANDS.BOLD_OFF);

      // Payment method
      await this.sendCommand(COMMANDS.ALIGN_CENTER);
      await this.sendText('--------------------------------');
      await this.sendText(`Payment: ${receipt.paymentMethod?.toUpperCase() || 'CASH'}`);

      // Footer
      await this.sendCommand(COMMANDS.FEED_LINES(2));
      await this.sendText('Thank you for dining with us!');
      await this.sendText('Please visit again');
      
      // Feed and cut
      await this.sendCommand(COMMANDS.FEED_LINES(4));
      await this.sendCommand(COMMANDS.PARTIAL_CUT);

      console.log('Receipt printed successfully');
    } catch (error) {
      console.error('Print error:', error);
      throw error;
    }
  }

  // Print a test page
  async printTest(): Promise<void> {
    if (!this.isConnected()) {
      throw new Error('Printer not connected');
    }

    await this.sendCommand(COMMANDS.INIT);
    await this.sendCommand(COMMANDS.ALIGN_CENTER);
    await this.sendCommand(COMMANDS.BOLD_ON);
    await this.sendCommand(COMMANDS.DOUBLE_HEIGHT);
    await this.sendText('PRINTER TEST');
    await this.sendCommand(COMMANDS.NORMAL_SIZE);
    await this.sendCommand(COMMANDS.BOLD_OFF);
    await this.sendText('--------------------------------');
    await this.sendText('If you can read this,');
    await this.sendText('your printer is working!');
    await this.sendText('--------------------------------');
    await this.sendCommand(COMMANDS.FEED_LINES(3));
    await this.sendCommand(COMMANDS.PARTIAL_CUT);
  }
}

export interface ReceiptData {
  restaurantName: string;
  tableNumber: number;
  billId: string;
  date: string;
  items: Array<{
    name: string;
    qty: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod?: 'cash' | 'fonepay';
}

// Singleton instance
export const receiptPrinter = new ReceiptPrinter();

// Hook for React components
export function useReceiptPrinter() {
  return {
    isSupported: receiptPrinter.isSupported(),
    isConnected: receiptPrinter.isConnected(),
    connect: () => receiptPrinter.connect(),
    disconnect: () => receiptPrinter.disconnect(),
    printReceipt: (data: ReceiptData) => receiptPrinter.printReceipt(data),
    printTest: () => receiptPrinter.printTest(),
  };
}
