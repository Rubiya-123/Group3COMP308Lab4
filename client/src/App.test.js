import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title", () => {
  render(<App />);
  expect(screen.getByText(/AI Smart Notes/i)).toBeInTheDocument();
});

test("renders generate notes button", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: /generate notes/i })
  ).toBeInTheDocument();
});

test("renders input textarea", () => {
  render(<App />);
  expect(
    screen.getByPlaceholderText(/Paste your lecture, article, or notes here/i)
  ).toBeInTheDocument();
});

test("renders generated notes section", () => {
  render(<App />);
  expect(screen.getByText(/Generated Notes/i)).toBeInTheDocument();
});
