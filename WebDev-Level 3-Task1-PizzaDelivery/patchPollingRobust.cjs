const fs = require('fs');

// 1. OrderTracking.jsx
let ot = fs.readFileSync('client/src/pages/user/OrderTracking.jsx', 'utf8');
ot = ot.replace('order.orderStatus === "SENT_TO_DELIVERY"', 'order.orderStatus === "DELIVERED"');
fs.writeFileSync('client/src/pages/user/OrderTracking.jsx', ot);

// 2. AdminDashboard.jsx
let ad = fs.readFileSync('client/src/pages/admin/AdminDashboard.jsx', 'utf8');
const adTarget = `  useEffect(() => {
    const initialLoad = setTimeout(load, 0);
    return () => clearTimeout(initialLoad);
  }, [load]);`;
const adReplace = `  useEffect(() => {
    const initialLoad = setTimeout(load, 0);
    const interval = setInterval(load, 10000);
    return () => { clearTimeout(initialLoad); clearInterval(interval); };
  }, [load]);`;
ad = ad.replace(adTarget, adReplace);
fs.writeFileSync('client/src/pages/admin/AdminDashboard.jsx', ad);

// 3. OrderSuccess.jsx
let os = fs.readFileSync('client/src/pages/user/OrderSuccess.jsx', 'utf8');
const osTarget = `  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);`;
const osReplace = `  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [fetchOrder]);`;
os = os.replace(osTarget, osReplace);
fs.writeFileSync('client/src/pages/user/OrderSuccess.jsx', os);

// 4. Dashboard.jsx
let db = fs.readFileSync('client/src/pages/user/Dashboard.jsx', 'utf8');
// Dashboard's useEffect fetchOrders is currently:
//   useEffect(() => {
//     const fetchOrders = async () => { ... };
//     fetchOrders();
//   }, []);
const dbTargetRegex = /useEffect\(\(\) => \{[\s\S]*?fetchOrders\(\);\s*\}, \[\]\);/;
db = db.replace(dbTargetRegex, `useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);`);
fs.writeFileSync('client/src/pages/user/Dashboard.jsx', db);
