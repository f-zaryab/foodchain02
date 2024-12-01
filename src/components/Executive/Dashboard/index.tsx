import { Button } from '@mantine/core';
import classes from './Dashboard.module.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleClick = (e : any) => {
        // console.log(typeof(e.target.textContent));
        const content = e.target.textContent;
        if(content === "Kitchen Data") {
            navigate('/dashboard/executive/kitchen-data');
        } else if(content === "Suppliers Data") {
            console.log("yeii");
            navigate('/dashboard/executive/suppliers-data');
        } else if(content === "Check Inventory") {
            navigate('/dashboard/executive/check_inventory');
        } else {
            navigate('/dashboard/executive/get-metrics');
        }
    }
    return (
        <div>
            <div className={classes.parentContainer}>
                <div className={classes.innerContainer}>
                    <Button variant="filled" size="md" onClick={(e) => handleClick(e)}>Kitchen Data</Button>
                    <Button variant="filled" size="md" onClick={(e) => handleClick(e)}>Suppliers Data</Button>
                </div>
                 
                <div className={classes.innerContainer}>
                    <Button variant="filled" size="md" onClick={(e) => handleClick(e)}>Check Inventory</Button>
                    <Button variant="filled" size="md" onClick={(e) => handleClick(e)}>Get Metrics</Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;