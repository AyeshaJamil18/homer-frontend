import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchField from "react-search-field";
import { UserService } from '../../service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    }
}));






const AddFriend = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState('');

    function on_Change(e)
    {
        setFirstName(UserService.apiFindUserByUsername(e));
        console.log (firstName);
    }
    return (
        <div className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Add Friend
            </Typography>
            <Grid
                item
                md={7}
                xs={12}
            >
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title}  variant="h5" color="textSecondary" gutterBottom>
                        Search Friend
                        <SearchField
                            placeholder="Search..."
                            searchText=""
                            classNames="test-class"
                            onSearchClick={(e) => on_Change(e)}
                        />

                    </Typography>

                </CardContent>
                <div>
                    {firstName}
                </div>
            </Card>
            </Grid>

        </div>
    );
};

export default AddFriend;
