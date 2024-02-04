/* eslint-disable jest/expect-expect */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { Button } from "./button";


test("clicking the button calls the event hanlder once", () => {
  const mockHandler = jest.fn();

  render(
    <Button
    text='this is a test'
    />
  );

  const button = screen.getByTestId("redirect-button");
  fireEvent.click(button);

  expect(mockHandler).toHaveBeenCalledTimes(1);
});