import React from "react";
import Rating from "@material-ui/lab/Rating";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";

const formatter = new Intl.NumberFormat("mm-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const BootCampCard = ({ bootcamp }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant="h6">{bootcamp.name}</Typography>}
      />
      <CardContent>
        <Typography variant="caption">{bootcamp.description}</Typography>
        <Typography variant="h6" gutterBottom>
          {formatter.format(bootcamp.price)}
        </Typography>
        <Rating
          value={bootcamp.rating}
          readOnly
          name={bootcamp.name}
          size="small"
          precision={0.5}
        />
      </CardContent>

      <CardActions>
        <Button variant="contained" size="small" color="primary">
          Book Now
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default BootCampCard;
