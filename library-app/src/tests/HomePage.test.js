import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage/HomePage";

test("renders homepage with necessary components", () => {
    render(<HomePage />);
    expect(screen.getByText("Upcoming Events")).toBeInTheDocument();
    expect(screen.getByText("Library Hours")).toBeInTheDocument();
    expect(screen.getByText("Get A Library Card")).toBeInTheDocument();
});
