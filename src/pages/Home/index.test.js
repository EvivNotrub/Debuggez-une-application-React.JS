import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import DataContext from "../../contexts/DataContext";


const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      "id": 2,
      "type": "braindamage experiance",
      "date": "2023-01-29T20:28:45.744Z",
      "title": "Joe's No-Brainer Flat Earth Conference",
      "cover": "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur ",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
          "1 espace d’exposition",
          "1 scéne principale",
          "1 site web dédié"
      ]
    },
  ],
  "focus": [
    {
        "title": "World economic forum",
        "description": "Oeuvre à la coopération entre le secteur public et le privé.",
        "date": "2022-01-29T20:28:45.744Z",
        "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
    },
]
};

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
    act(() => {
      render(
        <DataContext.Provider value={{data}} >
          <Home />
        </DataContext.Provider>
      );
    });
    await screen.findByTestId("eventList-testid");
    const EventCard = await screen.findAllByTestId("card-testid");
    expect(EventCard).toHaveLength(2);
  });
  it("the title of events is displayed", async () => {
    act(() => {
      render(
        <DataContext.Provider value={{data}} >
          <Home />
        </DataContext.Provider>
      );
    });
    const EventCard = await screen.findAllByTestId("card-testid");
    expect(EventCard[0]).toHaveTextContent("Conférence #productCON");
    expect(EventCard[1]).toHaveTextContent("Joe's No-Brainer Flat Earth Conference");
  });

  it("a list a people is displayed", async () => {
    render(<Home />);
    await screen.findAllByTestId("peopleCard-testid");
  })
  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByTestId("footer-testid");
    expect(footer).toBeInTheDocument();
  })
  it("a loading message appears if the last EventCard not yet loaded", async () => {
    render(<Home />);
    const loading = await screen.findByText("loading..");
    expect(loading).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    const lastEvent = {
      "id": 2,
      "type": "braindamage experiance",
      "date": "2022-01-29T20:28:45.744Z",
      "title": "Bob l'event",
      "cover": "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur ",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
          "1 espace d’exposition",
          "1 scéne principale",
          "1 site web dédié"
      ]
    };
    
    act(() => {
      render(
        <DataContext.Provider value={{lastEvent}} >
          <Home />
        </DataContext.Provider>
      );
    });
    const EventCard = await screen.findAllByTestId("card-testid");
    expect(EventCard).toHaveLength(1);
    const eventName = await screen.findByText("Bob l'event");
    expect(eventName).toBeInTheDocument();
  });
});
