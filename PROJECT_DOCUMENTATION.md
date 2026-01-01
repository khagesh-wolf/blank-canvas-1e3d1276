# Sajilo Orders POS - Complete Restaurant Management System

> **Zero Investment. Maximum Efficiency. Instant Results.**

Sajilo Orders is a comprehensive, cloud-based Point of Sale (POS) and restaurant management system designed specifically for cafes, restaurants, bars, and food establishments in Nepal. It replaces traditional paper-based ordering with a modern, digital solution that costs nothing to implement.

---

## 🎯 Why Sajilo Orders?

### The Problem with Traditional Systems
- Paper wastage and manual errors
- Delayed order communication between floor and kitchen
- No customer data or loyalty tracking
- Expensive POS hardware and software licenses
- No real-time visibility into business performance

### The Sajilo Solution
| Traditional | Sajilo Orders |
|-------------|---------------|
| Paper bills, manual writing | Digital QR ordering |
| Shouting orders to kitchen | Real-time Kitchen Display |
| No customer memory | Automatic loyalty program |
| Rs. 50,000+ POS systems | Completely FREE |
| Manual sales calculation | Automatic analytics & reports |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SAJILO ORDERS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   CUSTOMER  │  │   COUNTER   │  │   KITCHEN   │             │
│  │   (Mobile)  │  │   (Tablet)  │  │    (TV)     │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          │                                      │
│                   ┌──────▼──────┐                               │
│                   │  SUPABASE   │                               │
│                   │  REALTIME   │                               │
│                   │  DATABASE   │                               │
│                   └─────────────┘                               │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   WAITER    │  │    ADMIN    │  │   REPORTS   │             │
│  │   (Phone)   │  │  (Desktop)  │  │    (PDF)    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👤 User Roles & Features

### 1. Customer Interface (Mobile Web App)

Customers scan a QR code at their table and get instant access to the digital menu.

#### Features:
- **QR Code Ordering**: Scan table QR → Browse menu → Place order
- **Beautiful Menu Display**: High-quality images, descriptions, and prices
- **Category Navigation**: Easy browsing with category tabs and search
- **Subcategory Support**: Hierarchical menu organization (e.g., Drinks → Beers, Cocktails)
- **Portion Selection**: Choose drink sizes (30ml, 60ml, 90ml, etc.) with dynamic pricing
- **Favorites System**: Heart items for quick reordering on future visits
- **Real-time Order Status**: See when order is accepted, preparing, or ready
- **Order History**: View current session orders and totals
- **Call Waiter Button**: Request assistance with one tap
- **Special Instructions**: Add notes for dietary requirements or preferences
- **Loyalty Points Display**: See accumulated points and tier status
- **Dark/Light Mode**: Comfortable viewing in any environment
- **PWA Installation**: Install as app on phone for faster access
- **Rush Hour Indicator**: Know when kitchen is busy (estimated wait time)
- **Stock Awareness**: Out-of-stock items automatically hidden/disabled
- **Popular Items Badge**: See what other customers love
- **Social Media Links**: Quick access to restaurant's Instagram, Facebook, TikTok
- **Google Review Prompt**: Easy link to leave reviews

#### Customer Flow:
```
Scan QR → Enter Phone → Browse Menu → Add to Cart → Place Order → Track Status → Enjoy!
```

---

### 2. Counter Staff Interface (Tablet/Desktop)

The command center for daily operations.

#### Features:
- **Order Queue Management**: Accept/reject incoming orders with one click
- **Grouped Order Display**: Multiple orders from same customer grouped together
- **Order Age Timer**: Color-coded timers showing how long orders have been waiting
- **Kitchen Order Ticket (KOT) Printing**: Auto-print tickets for kitchen
- **Dual Printer Support**: Separate printers for kitchen and bar items
- **Bill Generation**: Create bills with automatic calculations
- **Multiple Payment Methods**: Cash, Fonepay QR, or Split Payment
- **Discount Application**: Percentage or fixed amount discounts
- **Loyalty Point Redemption**: Apply customer points as discounts
- **Transaction History**: Searchable history with date filters
- **Expense Tracking**: Log daily expenses by category (ingredients, utilities, salary, etc.)
- **Table Map View**: Visual overview of all tables and their status
- **Cash Register**: Track opening balance, cash in/out, expected closing
- **Waiter Call Notifications**: Audio + visual alerts for customer requests
- **Low Stock Alerts**: Get notified when inventory is running low
- **Backup Reminder**: Prompted to backup data regularly
- **Printer Management**: Connect and manage receipt/KOT printers
- **Quick Search**: Find orders by table, phone, or order ID
- **Kitchen Access**: Optional access to Kitchen Display page
- **Theme Toggle**: Switch between light and dark modes

#### Counter Flow:
```
New Order Alert → Review Items → Accept/Reject → Monitor Progress → Generate Bill → Process Payment
```

---

### 3. Kitchen Display System (TV/Monitor)

Wall-mounted display for kitchen staff to manage orders efficiently.

#### Features:
- **Real-time Order Display**: Orders appear instantly when accepted
- **Order Age Timer**: Color-coded timers (green → yellow → red)
- **Status Workflow**: New → Cooking → Ready with one-click progression
- **Priority Marking**: Rush orders highlighted prominently
- **Multiple View Modes**:
  - **Orders View**: Traditional order cards with all items
  - **Items View**: Aggregated item list across all orders
  - **Lanes View**: Category-based preparation lanes
- **Sound Notifications**: Audio alert for new orders (toggleable)
- **Fullscreen Mode**: Larger fonts optimized for wall-mounted displays
- **Order Details**: Table number, items, quantities, special notes
- **KOT Printing**: Manual reprint option for kitchen tickets
- **Low Stock Visibility**: See which items are running low
- **Item-Level Tracking**: Mark individual items as ready
- **KDS Mode**: Accept orders directly from kitchen (configurable)

#### Kitchen Flow:
```
Order Arrives → Start Preparing → Mark Items Ready → Complete Order → Bell for Pickup
```

---

### 4. Waiter Interface (Mobile Phone)

Designed for table service staff on the move.

#### Features:
- **PIN Login**: Quick 4-6 digit PIN entry (no typing usernames)
- **Table Selection**: Visual grid of all tables
- **Mobile Menu Access**: Full menu with images and portions
- **Order Taking**: Build orders while at the table
- **Stock Checking**: See available quantities before ordering
- **Cart Management**: Adjust quantities, add notes
- **Slide-Up Cart Panel**: Mobile-optimized cart interface
- **Order Submission**: Send directly to kitchen or counter
- **Active Orders View**: See all orders in progress
- **Ready Order Alerts**: Audio + visual notification when order is ready
- **Serve Confirmation**: Mark orders as served
- **Order Cancellation**: Cancel orders (with permission settings)
- **Dark/Light Mode**: Comfortable for various lighting conditions
- **Refresh Button**: Quick sync with server

#### Waiter Flow:
```
Login with PIN → Select Table → Take Order → Submit → Get Ready Alert → Serve → Repeat
```

---

### 5. Admin Dashboard (Desktop/Tablet)

Complete control over your restaurant operations.

#### Dashboard Features
- **Today's Stats**: Revenue, orders, active orders, active tables
- **Revenue Charts**: Daily trends with date range filters
- **Top Selling Items**: Visual breakdown of best performers
- **Quick Actions**: Access all management areas
- **Subscription Status**: View current plan status

#### Menu Management
- **Category Management**: Create, edit, reorder categories with drag-and-drop
- **Subcategory Support**: Organize items hierarchically
- **Bar/Kitchen Assignment**: Mark categories for specific printers
- **Prep Time Setting**: Set estimated preparation time per category
- **Menu Items**: Add/edit items with images, descriptions, prices
- **Image Upload**: CDN-hosted images via Cloudflare R2
- **Bulk Actions**: Enable/disable multiple items at once
- **Availability Toggle**: Mark items out of stock instantly
- **Search & Filter**: Find items quickly

#### Inventory Management
- **Stock Tracking**: Real-time inventory levels per item
- **Unit Types**: ml, pcs, grams, bottle, pack, kg, liter
- **Container Size**: Track bottles/packs with their sizes
- **Portion Configuration**: Set up drink portions (30ml, 60ml, etc.)
- **Portion Pricing**: Different prices per portion per item
- **Stock Receive**: Log incoming inventory
- **Stock Adjustment**: Manual corrections with notes
- **Waste Tracking**: Log wasted/spoiled items
- **Low Stock Alerts**: Configurable thresholds
- **Auto-Deduction**: Stock reduces when orders are accepted
- **Transaction History**: Full audit trail of all stock movements

#### Customer Management
- **Customer Database**: All customers with order history
- **Loyalty Tiers**: Bronze → Silver → Gold → Platinum (auto-calculated)
- **Points System**: Configurable earning and redemption rates
- **Customer Analytics**: Spending patterns, favorite items, visit frequency
- **Phone Number Update**: Change customer phone with auto-migration
- **Search & Filter**: Find customers by phone or name

#### Staff Management
- **Role-Based Access**: Admin, Counter, Kitchen, Waiter roles
- **Username/Password**: Secure login credentials
- **PIN Setup**: Quick PIN for waiter app access
- **Staff List**: View and manage all team members
- **Active/Inactive Status**: Disable accounts without deleting

#### Settings
- **Restaurant Details**: Name, sub-name, logo
- **WiFi Information**: Auto-included in QR codes
- **Table Configuration**: Set number of tables
- **Social Media Links**: Instagram, Facebook, TikTok, Google Reviews
- **Theme Settings**: System, Light, or Dark mode
- **Sound Alerts**: Enable/disable notification sounds
- **Counter Mode**: Enable counter-as-admin for small teams
- **Kitchen Access**: Allow counter staff to view Kitchen page
- **KDS Settings**: Kitchen Display System on/off
- **KOT Printing**: Kitchen Order Ticket settings
- **Dual Printer**: Separate kitchen and bar printers
- **Order Cancellation**: Restrict who can cancel accepted orders
- **Point System**: Enable/configure loyalty program

#### Reporting & Analytics
- **Sales Analytics**: Revenue, orders, average order value
- **Payment Breakdown**: Cash vs Fonepay payments
- **Peak Hours Analysis**: When is your busiest time
- **Category Performance**: Which categories sell best
- **Item Performance**: Top sellers and underperformers
- **Expense Analysis**: Spending by category
- **Date Range Filters**: Analyze any time period

#### Accounting Dashboard
- **Daily Cash Management**: Opening balance, transactions, closing
- **Expense Logging**: Record expenses by category
- **Cash vs Digital Split**: Track payment methods
- **Daily/Weekly/Monthly Views**: Flexible reporting periods
- **Profit Calculation**: Revenue minus expenses
- **Cash Drawer Sessions**: Track who opened/closed register

#### Monthly Reports (PDF Download)
- Financial Summary (revenue, expenses, profit)
- Payment Method Breakdown
- Expense Analysis by Category
- Sales by Menu Category
- Top Selling Items
- Daily Summary Table
- Detailed Expense Log
- Cash Drawer Sessions

#### Backup & Restore
- **One-Click Backup**: Download complete JSON backup
- **Backup Reminder**: Automatic reminders for regular backups
- **Restore Capability**: Upload backup to restore data
- **Backup Statistics**: See what's included in backup

---

## 🔒 Security Features

### Payment Block System
After a customer pays their bill, a 3-hour block prevents accidental reordering from the same table. Staff can override with PIN confirmation.

### Session Management
- 4-hour table session timeout
- Automatic logout after inactivity
- Session tokens to prevent bill manipulation
- Closed session tracking

### Access Control
- Role-based permissions
- PIN authentication for quick actions
- Password protection for admin functions
- Configurable order cancellation restrictions

### Rate Limiting
- Order placement rate limits (5 per 10 minutes)
- Login attempt rate limiting
- Protection against abuse

### Data Protection
- Encrypted connections (HTTPS)
- No sensitive data stored on client devices
- Cloud backup with Supabase

---

## 📱 PWA (Progressive Web App) Features

Sajilo Orders works as a native app without app store downloads.

### Installation Benefits
- Add to home screen on any device
- Offline menu browsing capability
- Push notification support
- Full-screen app experience
- Faster loading times
- Custom splash screens per role

### Supported Devices
- Android phones/tablets
- iPhones/iPads
- Windows/Mac computers
- Any modern web browser

### Install Pages
- `/install` - General installation page
- `/install/admin` - Admin-specific PWA setup
- `/install/counter` - Counter-specific PWA setup
- `/install/kitchen` - Kitchen-specific PWA setup
- `/install/waiter` - Waiter-specific PWA setup

---

## 🔊 Real-time Features

### Live Synchronization
- Orders appear instantly across all devices
- Status changes reflect in real-time
- Inventory updates sync immediately
- Settings changes apply immediately
- No manual refresh needed

### Notifications
- Audio alerts for new orders (customizable)
- Visual badges for pending items
- Waiter call notifications
- Ready order alerts for waiters
- Low stock warnings

### Offline Resilience
- Auto-reconnect when connection restores
- Data refresh on reconnection
- Connection status indicator
- Graceful degradation

---

## 📊 Business Intelligence

### Key Metrics Tracked
- Daily/Weekly/Monthly revenue
- Order counts and averages
- Peak business hours
- Top selling items
- Customer frequency and lifetime value
- Payment method preferences
- Expense trends by category
- Profit margins

### Customer Analytics
- Total orders per customer
- Total spending and tier
- Favorite items
- Days since last visit
- Average order value

### Insights Provided
- Which items to promote
- When to schedule more staff
- Which customers are VIPs
- Where money is being spent
- Growth trends over time

---

## 🛠️ Technical Requirements

### Minimum Requirements
- Stable internet connection
- Any modern web browser (Chrome, Safari, Firefox, Edge)
- Smartphone/tablet/computer

### Recommended Setup
| Device | Use Case | Recommendation |
|--------|----------|----------------|
| Counter | Order management | Tablet or laptop with thermal printer |
| Kitchen | Order display | Wall-mounted TV/monitor (32"+) |
| Waiter | Table service | Smartphone |
| Customer | Ordering | Their own phone |

### Printer Support
- ESC/POS compatible thermal printers
- USB or Network connection
- Separate printers for kitchen and bar

---

## 🚀 Getting Started

### Step 1: Setup Database
1. Create a Supabase project (free tier works)
2. Run the provided `supabase/schema.sql`
3. Note your Supabase URL and anon key

### Step 2: Configure Application
1. Deploy the application (Vercel, Netlify, etc.)
2. Set environment variables for Supabase
3. Access the app and login

### Step 3: Initial Setup
1. Login with default admin (admin/admin123)
2. Change default passwords immediately
3. Update restaurant settings (name, logo, tables)
4. Add menu categories
5. Add menu items with images
6. Create staff accounts with appropriate roles
7. Configure printer settings

### Step 4: Generate QR Codes
1. Go to Admin → QR Code section
2. Print QR codes for each table
3. Place QR codes on tables

### Step 5: Go Live
1. Train staff on their interfaces
2. Test the full order flow
3. Start accepting customer orders!

---

## 💰 Cost Breakdown

### What You Need (Already Have)
- Smartphones (staff already have)
- Tablet for counter (optional, phone works)
- Internet connection (already have)

### Optional Investments
- Wall-mounted TV for kitchen: Rs. 15,000-25,000
- Thermal receipt printer: Rs. 5,000-10,000
- Tablet for counter: Rs. 15,000-25,000

### What's FREE
- Sajilo Orders software
- Supabase database (free tier: 500MB)
- Image hosting via Cloudflare R2
- All updates and features

### Total Investment: Rs. 0 to Rs. 60,000
*Compare to traditional POS: Rs. 1,00,000+*

---

## 💡 Why Choose Sajilo Orders?

### For Restaurant Owners
- **Zero Monthly Fees**: No subscription costs
- **Zero Hardware Lock-in**: Works on any device
- **Instant ROI**: Save paper, reduce errors, serve faster
- **Data-Driven Decisions**: Analytics to grow your business
- **Customer Loyalty**: Built-in points system
- **Scalable**: Works for 5 tables or 50 tables

### For Staff
- **Less Running**: Orders go directly to kitchen
- **Fewer Errors**: Digital clarity, no handwriting issues
- **Faster Service**: Real-time status updates
- **Easy to Learn**: Intuitive, mobile-first interface
- **Quick Login**: PIN-based access for waiters

### For Customers
- **Convenience**: Order from phone, no waiting for waiter
- **Transparency**: See menu with prices and images
- **Control**: Add to cart, review, then order
- **Loyalty Rewards**: Earn points on every order
- **Real-time Updates**: Know exactly when food is ready
- **Favorites**: Quick access to preferred items

---

## 📞 Support & Documentation

### Included Documentation
- `README.md` - Quick start guide
- `TECHNICAL_SETUP_GUIDE.md` - Detailed technical setup
- `DEPLOYMENT.md` - Deployment instructions
- `PRINT_SERVER_GUIDE.md` - Printer configuration
- `DATABASE_OPTIMIZATION.md` - Database tuning tips
- `supabase/schema.sql` - Complete database schema

### Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Orders not appearing | Check internet connection, refresh page |
| Printer not working | Verify printer configuration in settings |
| QR not scanning | Ensure camera permissions granted |
| Slow performance | Check internet speed, clear browser cache |
| Login issues | Reset password, check username spelling |

---

## 🎯 Summary

Sajilo Orders transforms restaurant operations with:

✅ **Digital QR Ordering** - Customers order from their phones
✅ **Kitchen Display System** - Real-time order management
✅ **Waiter Mobile App** - Table service made efficient
✅ **Complete POS** - Billing, payments, and reports
✅ **Inventory Tracking** - Never run out of stock
✅ **Customer Loyalty** - Automatic points and tiers
✅ **Business Analytics** - Data to drive growth
✅ **Multi-Device Sync** - Everything updates in real-time
✅ **PWA Support** - Works like a native app
✅ **Dual Printer Support** - Kitchen and bar separation
✅ **Expense Tracking** - Complete accounting
✅ **Monthly Reports** - PDF export for records
✅ **Zero Cost** - Completely free to use

---

**Sajilo Orders** - *Making Restaurant Management Simple*

*Developed with ❤️ for the Nepali food & beverage industry*

---

## Version History

- **v3.1** - Current version with complete feature set
- Inventory management with portions
- Dual printer support
- Enhanced KDS modes
- Payment block system
- Comprehensive reporting
- PWA installation pages
