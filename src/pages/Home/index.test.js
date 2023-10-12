import { fireEvent, act, waitFor, render, screen } from "@testing-library/react";
import Home from "./index";
import { wait } from "@testing-library/user-event/dist/utils";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    await screen.findByTestId("eventList-testid");
  });
  it("a list a people is displayed", async () => {
    render(<Home />);
    await screen.findAllByTestId("peopleCard-testid");
  })
  it("a footer is displayed", () => {
    render(<Home />);
    screen.getByTestId("footer-testid");
  })
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    await screen.findByText("Notre derniére prestation");
    const TIMEOUT = 3000; // mockContactApi response + button title loading time
    await waitFor(() => screen.getByTestId("card-testid"), { timeout: TIMEOUT });

  })
});
