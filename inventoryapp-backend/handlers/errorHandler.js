import express from "express";

export default function errorHandler(res, err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  }