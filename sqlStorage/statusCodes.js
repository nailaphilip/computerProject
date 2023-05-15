"use strict";

const CODES = {
  PROGRAM_ERROR: 0,
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
  UPDATE_OK: 5,
  NOT_UPDATED: 6,
  REMOVE_OK: 7,
  NOT_REMOVED: 8,
};

const TYPES = {
  INFO: "info",
  ERROR: "error",
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in our program",
    code: CODES.PROGRAM_ERROR,
    type: TYPES.ERROR,
  }),
  NOT_FOUND: (key, value) => ({
    message: `No resouce found with ${key} ${value}`,
    code: CODES.NOT_FOUND,
    type: TYPES.INFO,
  }),
  INSERT_OK: (key, value) => ({
    message: `Resource inserted with ${key} ${value}`,
    code: CODES.INSERT_OK,
    type: TYPES.INFO,
  }),
  NOT_INSERTED: () => ({
    message: "Resource not inserted",
    code: CODES.NOT_INSERTED,
    type: TYPES.ERROR,
  }),
  ALREADY_IN_USE: (key, value) => ({
    message: `${key} ${value} was already in use`,
    code: CODES.ALREADY_IN_USE,
    type: TYPES.ERROR,
  }),
  UPDATE_OK: (key, value) => ({
    message: `Resource with ${key} ${value} was updated`,
    code: CODES.UPDATE_OK,
    type: TYPES.INFO,
  }),
  NOT_UPDATED: () => ({
    message: "Data was not updated",
    code: CODES.NOT_UPDATED,
    type: TYPES.ERROR,
  }),
  REMOVE_OK: (key, value) => ({
    message: `Resource with ${key} ${value} was removed`,
    code: CODES.REMOVE_OK,
    type: TYPES.INFO,
  }),
  NOT_REMOVED: (key, value) => ({
    message: `No resource found with ${key} ${value}. Nothing removed`,
    code: CODES.NOT_REMOVED,
    type: TYPES.ERROR,
  }),
};

module.exports = { CODES, TYPES, MESSAGES };
