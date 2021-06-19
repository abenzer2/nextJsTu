import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  useTheme,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogContent,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import { FilterList } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { format } from "date-fns";

import DateFnsUtils from "@date-io/date-fns";

import EnhancedTable from "../src/ui/EnhancedTable";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  complexity: {
    fontWeight: 300,
  },
  users: {
    fontWeight: 300,
  },
  usersRoot: {
    // marginRight:0
  },
  button: {
    color: "fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

// function createData(
//   name,
//   date,
//   service,
//   features,
//   complexity,
//   platforms,
//   users,
//   total
// ) {
//   var i;
//   let data=[];
// for (i = 0; i < 10; i++) {
//   data=[...data , { name, date, service, features, complexity, platforms, users, total }]
// }
// console.log(data)
//   return data ;
// }

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();

  const [rows, setRows] = useState([
    createData(
      "Abenezer",
      "11-02-19",
      "Website",
      "E-commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Dagim",
      "11-02-19",
      "Custom Software",
      "GPS",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Tinsae",
      "11-02-19",
      "Website",
      "E-commerce, GPS, Push Notifications, User Authentication",
      "N/A",
      "N/A",
      "10-100",
      "$1600",
      true
    ),
  ]);

  const platformOptions = ["Web", "iOS", "Android"];
  const featureOptions = [
    "Phot/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];

  const websiteOptions = ["Basic", "Interactive", "E-Commerce"];

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [service, setService] = useState("");
  const [features, setFeatures] = useState([]);
  const [complexity, setComplexity] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [users, setUsers] = useState("");
  const [total, setTotal] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const clearData = () => {
    setName(""),
      setDate(new Date()),
      setTotal(""),
      setService(""),
      setComplexity(""),
      setUsers(""),
      setPlatforms([]),
      setFeatures([]);
  };

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yyyy"),
        service,
        features.join(", "),
        complexity,
        platforms.join(", "),
        users,
        total,
        true
      ),
    ]);
    setDialogOpen(false);
    clearData();
  };

  const printData = () => {
    console.log(
      name,
      format(date, "MM/dd/yyyy"),
      service,
      features.join(", "),
      complexity,
      platforms.join(", "),
      users,
      total
    );
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );

    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

    // console.log(rowData);
    // console.log(rows);
    const newRows =[...rows]
    matches.map((row,index)=>row.includes(true) ? 
      newRows[index].search=true : newRows[index].search = false
    )
    // console.log(matches)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column">
        <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            value={search}
            onChange={(event) => handleSearch(event)}
            style={{ width: "35em", marginLeft: "5em" }}
            placeholder="Search Project or create a new one"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setDialogOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
          <FormGroup row>
            <FormControlLabel
              style={{
                marginRight: "5em",
              }}
              control={
                <Switch
                  checked={websiteChecked}
                  color="primary"
                  onChange={() => setWebsiteChecked(!websiteChecked)}
                />
              }
              label="Websites"
              labelPlacement="start"
            />
            <FormControlLabel
              style={{
                marginRight: "5em",
              }}
              control={
                <Switch
                  checked={iOSChecked}
                  color="primary"
                  onChange={() => setIOSChecked(!iOSChecked)}
                />
              }
              label="iOS Apss"
              labelPlacement="start"
            />
            <FormControlLabel
              style={{
                marginRight: "5em",
              }}
              control={
                <Switch
                  checked={androidChecked}
                  color="primary"
                  onChange={() => setAndroidChecked(!androidChecked)}
                />
              }
              label="Android Apps"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={softwareChecked}
                  color="primary"
                  onChange={() => setSoftwareChecked(!softwareChecked)}
                />
              }
              label="Custom Software"
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>
        <Grid item container justify="flex-end" style={{ marginTop: "5em" }}>
          <Grid item style={{ marginRight: 75 }}>
            <FilterList color="secondary" style={{ fontSize: 50 }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: "15em" }}>
          <EnhancedTable rows={rows} />
        </Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          open={dialogOpen}
          style={{ zIndex: 1302 }}
          onClose={() => setDialogOpen(false)}
        >
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new Project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justify="space-between">
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    style={{ marginTop: "5em" }}
                  >
                    <Grid item>
                      <Typography variant="h4">Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label="service"
                        name="service"
                        value={service}
                        onChange={(event) => setService(event.target.value)}
                      >
                        <FormControlLabel
                          value="Website"
                          label="Website"
                          control={<Radio />}
                          classes={{ label: classes.service }}
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value="Mobile App"
                          label="Mobile App"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value="Custom Software"
                          label="Custom Software"
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid item>
                      <Select
                        labelId="platforms"
                        id="platforms"
                        style={{ width: "12em" }}
                        multiline
                        multiple
                        value={platforms}
                        displayEmpty
                        MenuProps={{ style: { zIndex: 1302 } }}
                        renderValue={
                          platforms.length > 0 ? undefined : () => "Platforms"
                        }
                        onChange={(event) => setPlatforms(event.target.value)}
                      >
                        {platformOptions.map((option) => (
                          <MenuItem key={option} value={option} style={{zIndex:1310}}
                          
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems="center"
                  style={{ marginTop: "16px" }}
                >
                  <Grid item>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
                    >
                      <Grid item>
                        <Typography variant="h4">Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="Complexity"
                          name="Complexity"
                          value={complexity}
                          onChange={(event) =>
                            setComplexity(event.target.value)
                          }
                        >
                          <FormControlLabel
                            classes={{ label: classes.complexity }}
                            value="Low"
                            label="Low"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            value="Medium"
                            label="Medium"
                            control={<Radio />}
                            classes={{ label: classes.complexity }}
                          />
                          <FormControlLabel
                            classes={{ label: classes.complexity }}
                            value="High"
                            label="High"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems="flex-end"
                >
                  <Grid item>
                    <TextField
                      value={total}
                      label="Total"
                      id="total"
                      onChange={(e) => setTotal(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
                    >
                      <Grid item>
                        <Typography variant="h4">Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="users"
                          name="users"
                          value={users}
                          onChange={(event) => setUsers(event.target.value)}
                        >
                          <FormControlLabel
                            disabled={service === "Website"}
                            value="0-10"
                            label="0-10"
                            control={<Radio />}
                            classes={{
                              label: classes.users,
                              root: classes.usersRoot,
                            }}
                          />
                          <FormControlLabel
                            disabled={service === "Website"}
                            classes={{ label: classes.users }}
                            value="10-100"
                            label="10-100"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === "Website"}
                            classes={{ label: classes.users }}
                            value="100+"
                            label="100+"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid item>
                        <Select
                          labelId="features"
                          id="features"
                          multiple
                          multiline
                          style={{ width: "12em" }}
                          MenuProps={{ style: { zIndex: 1302 } }}
                          value={features}
                          displayEmpty
                          renderValue={
                            features.length > 0 ? undefined : () => "Features"
                          }
                          onChange={(event) => setFeatures(event.target.value)}
                        >
                          {service === "Website"
                            ? websiteOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))
                            : featureOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: "3em" }}>
              <Grid item>
                <Button
                  color="primary"
                  style={{ fontWeight: 300 }}
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={addProject}
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add a Project +
                </Button>
              </Grid>
              {/* <Grid item>
                <Button
                onClick={printData}
                >
                  print data
                </Button>
              </Grid> */}
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
