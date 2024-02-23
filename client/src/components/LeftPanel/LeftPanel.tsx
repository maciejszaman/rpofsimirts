import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as SharedTypes from "../../shared/SharedTypes.types";

export const LeftPanel = () => {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<string[]>([]);

  const scrollTo = () => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  const getDays = async () => {
    setLoading(true);
    try {
      const res = await axios.get("//localhost:2137/list-files");
      const resdata = res.data;
      const uniqueDays = Array.from(
        new Set(resdata.map((item: SharedTypes.File) => item.uploadedDateShort))
      ) as string[];
      const sortedDates = uniqueDays.sort((a, b) => {
        const dateA = new Date(a.split("/").reverse().join("/"));
        const dateB = new Date(b.split("/").reverse().join("/"));

        // Sorting in descending order (latest date first)
        return dateB.getTime() - dateA.getTime();
      });
      setDays(sortedDates);
      setLoading(false);
      console.log(uniqueDays);
    } catch {}
  };

  useEffect(() => {
    getDays();
    console.log(days);
  }, []);

  return (
    <Paper
      elevation={1}
      className="hidden md:block min-h-screen w-1/6 min-w-fit md:sticky left-0 top-0"
    >
      <List>
        {loading ? (
          <CircularProgress className="fixed left-1/2 top-1/2" />
        ) : (
          days.map((day, index) => (
            <ListItem key={index}>
              <ListItemButton LinkComponent="a" onClick={() => scrollTo()}>
                <ListItemText primary={day} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};
