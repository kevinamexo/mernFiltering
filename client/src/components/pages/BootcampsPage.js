import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
  Slider,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import BootcampCard from "./BootCampCard";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: "13px",
  },
  //   bootcampGrid: {
  //     marginTop: "15px",
  //   },
  filters: {
    padding: "0 1.5rem",
  },
  priceRangeInputs: {
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    padding: "10px 0",
  },
});

const BootcampsPage = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25, 75]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios({
          method: "GET",
          url: "http://localhost:8000/api/v1/bootcamps",
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setBootcamps(data.data);
        console.log(bootcamps);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSliderCommiteed = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;

    SE;
  };
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container className={classes.bootcampGrid}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Filters</Typography>

            <div className={classes.filters}>
              <Slider
                min={0}
                max={sliderMax}
                value={priceRange}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => setPriceRange(newValue)}
                onChangeCommited={onSliderCommitted}
              />
              <div className={classes.priceRangeInputs}>
                <TextField
                  size="small"
                  id="lower"
                  label="Min Price"
                  variant="outlined"
                  disabled={loading}
                  value={0}
                />
                <TextField
                  size="small"
                  id="upper"
                  label="Max Price"
                  variant="outlined"
                  disabled={loading}
                  value={75}
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sorty By</Typography>

            <FormControl component="fieldset" className={classes.filters}>
              <RadioGroup aria-label="price-order" name="price-order">
                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Highest-Lowest"
                />
                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Lowest-Highest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          bootcamps.map((bootcamp) => (
            <Grid item key={bootcamp._id} xs={12} s={6} md={4} lg={3}>
              <BootcampCard bootcamp={bootcamp} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default BootcampsPage;
