type ThoughtPrompt = {
  category: string;
  prompts: string[];
};

const thoughtPrompts: ThoughtPrompt[] = [
  {
    category: "Pflicht und Dringlichkeit",
    prompts: [
      "Was muss *heute* auf jeden Fall erledigt werden?",
      "Gibt es Deadlines, Termine oder Meetings?",
      "Welche Aufgaben habe ich gestern nicht geschafft?",
    ],
  },
  {
    category: "Ziele & Fortschritt",
    prompts: [
      "Was bringt mich heute näher an mein Wochenziel?",
      "Gibt es kleine Schritte, die ich heute erledigen kann?",
      "Welche Aufgabe zahlt auf meine langfristigen Projekte ein?",
    ],
  },
  {
    category: "Selbstfürsorge & Balance",
    prompts: [
      "Was kann ich heute für mich selbst tun (Bewegung, Pausen, Ernährung)?",
      "Wann plane ich bewusste Erholung oder Fokuszeit ein?",
      "Habe ich genug Puffer für Unerwartetes?",
    ],
  },
  {
    category: "Kommunikation & Kooperation",
    prompts: [
      "Muss ich jemandem antworten, etwas schicken oder ein Update geben?",
      "Gibt es etwas, das ich delegieren oder abstimmen sollte?",
    ],
  },
  {
    category: "Organisation & Klarheit",
    prompts: [
      "Was würde heute für mehr Ordnung/Struktur sorgen?",
      "Welche kleine Aufräum- oder Verwaltungsaufgabe kann ich einschieben?",
    ],
  },
  {
    category: "Motivation & Leichtigkeit",
    prompts: [
      "Gibt es eine Aufgabe, auf die ich mich freue?",
      "Was kann ich tun, um mir den Tag angenehm zu gestalten?",
      "Welche kleine Aufgabe kann ich als „leichter Einstieg“ nutzen?",
    ],
  },
];

type InspirationProps = {
    count: number;
  };

export default function Inspiration({count}:InspirationProps) {
  const randomThoughts = getRandomThoughts(count);

  return (

    randomThoughts.map((thought) => (
      <div className="mb-4">
        <p>{thought}</p>
      </div>
    ))


    );
}

const allPrompts = thoughtPrompts.flatMap((p) => p.prompts);

function getRandomThoughts(n: number): string[] {
  const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}
