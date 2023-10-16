import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

const mockData = {
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

describe("When a data context is created", () => {
  it("a call is executed on the events.json file", async () => {
    api.loadData = jest.fn().mockReturnValue({ result: "ok" });
    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });
  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockRejectedValue("error on calling events");

      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };
      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );
      const dataDisplayed = await screen.findByText("error on calling events");
      expect(dataDisplayed).toBeInTheDocument();
    });
  });
  it("api.loadData", () => {
    window.console.error = jest.fn();
    global.fetch = jest.fn().mockResolvedValue(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );
    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
  });
  it("a lastEvent is dispatched", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    const Component = () => {
      const { lastEvent } = useData();
      return <div>{lastEvent?.title}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
    const dataDisplayed = await screen.findByText("Joe's No-Brainer Flat Earth Conference");
    expect(dataDisplayed).toBeInTheDocument();
  });

});
