import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
  
export default function Navbar({items}) {
    const location = useLocation()
    let tab = location.pathname === "/" ? 0 : 1

    const [value, setValue] = useState(tab);
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleRoute = (e) => {

    }
  
    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" onClick={handleRoute}>
                    {items.map((item, index) => (
                        <Tab key={index} component={Link} to={item.to} label={item.name} sx={{fontSize: 17}} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
}