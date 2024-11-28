import { Button } from '@mantine/core';
import classes from './Dashboard.module.css'

const Dashboard = () => {
    return (
        <div>
            <div className={classes.parentContainer}>
                <div className={classes.innerContainer}>
                    <Button variant="filled" size="md">Kitchen Data</Button>
                    <Button variant="filled" size="md">Suppliers Data</Button>
                </div>
                 
                <div className={classes.innerContainer}>
                    <Button variant="filled" size="md">Check Inventory</Button>
                    <Button variant="filled" size="md">Get Metrics</Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;