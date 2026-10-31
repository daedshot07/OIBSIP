const fs = require('fs');

// PATCH LOGIN.JSX
let loginCode = fs.readFileSync('src/pages/auth/Login.jsx', 'utf8');

loginCode = loginCode.replace(
  "import { AuthContext } from '../../context/AuthContext';",
  "import { AuthContext } from '../../context/AuthContext';\nimport { CartContext } from '../../context/CartContext';"
);

loginCode = loginCode.replace(
  "const {login,user}=useContext(AuthContext);",
  "const {login,user}=useContext(AuthContext);\nconst { addToCart } = useContext(CartContext);"
);

loginCode = loginCode.replace(
  "useEffect(()=>{if(user) navigate('/dashboard',{replace:true});},[user,navigate]);",
  "useEffect(() => {\n    if (user) {\n      const pending = localStorage.getItem('pendingPizza');\n      if (pending) {\n        addToCart(JSON.parse(pending));\n        localStorage.removeItem('pendingPizza');\n        navigate('/summary', { replace: true });\n      } else {\n        navigate('/dashboard', { replace: true });\n      }\n    }\n  }, [user, navigate, addToCart]);"
);

loginCode = loginCode.replace(
  "toast.success('Welcome back.');navigate('/dashboard');",
  "toast.success('Welcome back.');"
);

fs.writeFileSync('src/pages/auth/Login.jsx', loginCode, 'utf8');
console.log('Patched Login.jsx');

// PATCH BUILDSUMMARY.JSX
let buildCode = fs.readFileSync('src/components/landing/BuildSummary.jsx', 'utf8');

buildCode = buildCode.replace(
  "import { Link } from 'react-router-dom';",
  "import { useNavigate } from 'react-router-dom';"
);

buildCode = buildCode.replace(
  "export default function BuildSummary({ base, sauce, cheese, toppings, samplePrice, formatPrice }) {",
  "export default function BuildSummary({ base, sauce, cheese, toppings, samplePrice, formatPrice }) {\n  const navigate = useNavigate();\n\n  const handlePlaceOrder = () => {\n    const pendingPizza = {\n      base,\n      sauce,\n      cheese,\n      veggies: toppings,\n      price: samplePrice,\n      quantity: 1,\n      name: 'Custom Pizza'\n    };\n    localStorage.setItem('pendingPizza', JSON.stringify(pendingPizza));\n    navigate('/login');\n  };"
);

buildCode = buildCode.replace(
  '<Link className="button button--primary" to="/register">Build your pizza <ArrowUpRight size={17} aria-hidden="true" /></Link>',
  '<button className="button button--primary" onClick={handlePlaceOrder}>Place Order <ArrowUpRight size={17} aria-hidden="true" /></button>'
);

fs.writeFileSync('src/components/landing/BuildSummary.jsx', buildCode, 'utf8');
console.log('Patched BuildSummary.jsx');
