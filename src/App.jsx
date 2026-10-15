
import React, { useMemo, useState } from "react";

const papers = {
  "0745": { title: "Group Survival Under Categorical Delegitimation", authors: "Ashenafi Biru, Andrea Sottini & Garry Bruton" },
  "0760": { title: "The Emergence of Community-Based Actorhood Amidst Non-International Armed Conflicts", authors: "Amit Nigam, Diana Trujillo & Alexandro Giudici" },
  "0883": { title: "Organisational Responses to War: Competing Institutional Demands", authors: "Gary Bowman & Paul Beamish" },
  "0926": { title: "From Development to Discord: Conflicts and the Role of Aid, Business, and Geopolitics", authors: "Michael Wolfesberger & Markus Habernig" },
  "0928": { title: "Silence Through De-Responsibility Work: How Organizations Sustain Non-Engagement Amid Geopolitical Conflicts", authors: "Gastone Gualtieri, Alexander Buhmann, Aurélie Laborde & Ansgar Zerfaß" },
  "0930": { title: "Legitimacy Pressure, Organisational Latitude, and MNE Exit from Russia", authors: "Killian McCarthy, Ayse Saka-Helmhout & Anna Nadolska" },
  "0934": { title: "Third-Country Product Introductions Following Bilateral Geopolitical Disputes", authors: "Yun Hou & Xinyi Mo" },
  "0941": { title: "Foreign Dependence, Nationalist Rhetoric, and Philanthropic Donations", authors: "Xuchang Chen, Yusaku Takeda & Lori Qingyuan Yue" },
  "0942": { title: "Corporate Combat in Times of War: Business Transformation and Bridging Economic and Military Spheres", authors: "Felix Klaus Zufall, Sarah Margaretha Jastram, Viktoriia Apalkova & Markus Scholz" },
  "0945": { title: "CEO Cognitive Flexibility and Product Ambidexterity Under Geopolitical Tensions", authors: "Amir Mehralian, Arash Sadeghi, Ralf Wilden & Imtiaz Mostafiz" },
  "0946": { title: "Seeing Like an Authoritarian Market", authors: "Peter Bloom" },
  "0970": { title: "The Geopolitical Security of Resource Bases", authors: "Thomas Leirvik & Chamath Dilshan Jayasinghe" },
  "0972": { title: "Weaponizing CSR", authors: "Shoaib Ul Haq & Subhabrata Bobby Banerjee" },
  "0973": { title: "Shout into the Void: Military Veterans’ Health Disclosures at Work", authors: "Laura J. Ferris, Richard O'Quinn, Emma B. Knight, Tarli Young & Justin Peter Brienza" },
  "0984": { title: "Corporate Warification: Explaining Nonmarket Strategies in Wartime Ukraine", authors: "David Sieber-Mengel & Dorothee Winkler" },
  "0985": { title: "Exit to Exist: Firms’ Selective Divestment Under Sanctions", authors: "Alina Kinchinbayeva" },
  "0990": { title: "Chexim and Asian Development Bank Urban Railways Financing and Delivery in Vietnam", authors: "Roberto Cardinale" },
  "0991": { title: "Identity Disintegration Under Geopolitical Tension", authors: "Dorit Efrat-Treister, Yarin Sultan, Amir Grinstein & Ella Miron-Spektor" },
  "0992": { title: "The Timing of Multinationals’ Forced Foreign Divestments", authors: "Htwe Htwe Thein, Anna Grosman, Alvaro Cuervo-Cazurra, Sergey Sosnovskikh & Luisa Campos" },
  "0995": { title: "When War Enters the Workplace: Moral Injury by Association and Relational Moral Repair", authors: "Alexej Koveshnikov, Sofia Villo & Mark van der Giessen" },
  "1020": { title: "Custodians of Conflict: Ethnic-Language Newspapers, Local Business, and Insurgency", authors: "Rajiv Krishnan Kozhikode & Rekha Krishnan" },
  "1209": { title: "When Survival Becomes Collective: Relational Mechanisms of Venture Continuity Under Chronic Insecurity", authors: "Mona Itani & Ziad El-Award" }
};

const initialBlocks = [
  { day: "Friday", theme: "Identity, Legitimacy and Belonging Under Conflict", items: ["0745","0995","0973","0760"] },
  { day: "Friday", theme: "Organising and Transformation Under Conflict", items: ["1209","1020","0926","0942"] },
  { day: "Friday", theme: "Geopolitical Pressure, Identity and Corporate Response", items: ["0941","0984","0992","0991"] },
  { day: "Friday", theme: "Responsibility, Silence and Authoritarian Markets", items: ["0928","0946"] },
  { day: "Saturday", theme: "MNE Exit, Divestment and Strategic Adaptation", items: ["0930","0985","0883","0934"] },
  { day: "Saturday", theme: "Corporate Responsibility, Flexibility and Geopolitical Exposure", items: ["0990","0945","0970","0972"] }
];

const slotTimes = [
  ["Friday","08:15","08:45"],
  ["Friday","08:45","09:15"],
  ["Friday","09:15","09:45"],
  ["Friday","09:45","10:15"],

  ["Friday","10:35","11:05"],
  ["Friday","11:05","11:35"],
  ["Friday","11:35","12:05"],
  ["Friday","12:05","12:35"],

  ["Friday","13:20","13:50"],
  ["Friday","13:50","14:20"],
  ["Friday","14:20","14:50"],
  ["Friday","14:50","15:20"],

  ["Friday","15:40","16:10"],
  ["Friday","16:10","16:40"],

  ["Saturday","08:00","08:30"],
  ["Saturday","08:30","09:00"],
  ["Saturday","09:00","09:30"],
  ["Saturday","09:30","10:00"],

  ["Saturday","10:20","10:50"],
  ["Saturday","10:50","11:20"],
  ["Saturday","11:20","11:50"],
  ["Saturday","11:50","12:20"]
];

const fixedEvents = {
  Friday: [
    ["08:00","08:15","Welcome and Opening Remarks","welcome"],
    ["10:15","10:35","Coffee Break","break"],
    ["12:35","13:20","Lunch","meal"],
    ["15:20","15:40","Coffee Break","break"],
    ["16:40","17:00","Closing remarks for day 1","closing"],
    ["18:30","19:15","Drinks reception","reception"],
    ["19:15","19:30","Welcome speech before dinner","speech"],
    ["19:30","","Dinner served · Keynote: Margaret MacMillan","keynote"]
  ],
  Saturday: [
    ["10:00","10:20","Coffee Break","break"],
    ["12:20","12:30","Closing remarks for day 2","closing"]
  ]
};

const eventStyles = {
  welcome: "bg-[#d9e6ee] border-[#abc3d2] text-[#173b56]",
  break: "bg-[#f3e6cf] border-[#ddc49b] text-[#6f4b16]",
  meal: "bg-[#e1eee2] border-[#b8d1ba] text-[#315b35]",
  closing: "bg-[#e8e5ef] border-[#cbc3db] text-[#4f4266]",
  reception: "bg-[#d9e6ee] border-[#abc3d2] text-[#173b56]",
  speech: "bg-[#f0e5e7] border-[#d7b9bf] text-[#782337]",
  keynote: "bg-[#132f51] border-[#132f51] text-white"
};

const slotLookup = {
  "0745": ["Friday","08:15","08:45"],
  "0995": ["Friday","08:45","09:15"],
  "0973": ["Friday","09:15","09:45"],
  "0760": ["Friday","09:45","10:15"],

  "1209": ["Friday","10:35","11:05"],
  "1020": ["Friday","11:05","11:35"],
  "0926": ["Friday","11:35","12:05"],
  "0942": ["Friday","12:05","12:35"],

  "0941": ["Friday","13:20","13:50"],
  "0984": ["Friday","13:50","14:20"],
  "0992": ["Friday","14:20","14:50"],
  "0991": ["Friday","14:50","15:20"],

  "0928": ["Friday","15:40","16:10"],
  "0946": ["Friday","16:10","16:40"],

  "0930": ["Saturday","08:00","08:30"],
  "0985": ["Saturday","08:30","09:00"],
  "0883": ["Saturday","09:00","09:30"],
  "0934": ["Saturday","09:30","10:00"],

  "0990": ["Saturday","10:20","10:50"],
  "0945": ["Saturday","10:50","11:20"],
  "0970": ["Saturday","11:20","11:50"],
  "0972": ["Saturday","11:50","12:20"]
};

export default function App() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [day, setDay] = useState("Friday");
  const [query, setQuery] = useState("");

const rows = useMemo(() => {

  const activeBlocks = blocks.filter(b => b.day === day);

  const orderedIds = activeBlocks.flatMap(b => b.items);

  const slots = slotTimes.filter(s => s[0] === day);

  return orderedIds.map((id, i) => ({
    id,
    start: slots[i]?.[1] || "",
    end: slots[i]?.[2] || "",
    number: i + 1
  }));
}, [blocks, day]);

  const move = (blockIndex, itemIndex, delta) => {
    const next = structuredClone(blocks);
    const dayItems = next.flatMap((b, bi) => b.day === day ? b.items.map((id, ii) => ({ id, bi, ii })) : []);
    const currentId = next[blockIndex].items[itemIndex];
    const pos = dayItems.findIndex(x => x.id === currentId);
    const target = dayItems[pos + delta];
    if (!target) return;
    const otherId = next[target.bi].items[target.ii];
    next[target.bi].items[target.ii] = currentId;
    next[blockIndex].items[itemIndex] = otherId;
    setBlocks(next);
  };

  const rename = (i, value) => {
    const next = [...blocks];
    next[i] = { ...next[i], theme: value };
    setBlocks(next);
  };

  const reset = () => setBlocks(initialBlocks);

const blocksToShow = query.trim()
  ? blocks
  : blocks.filter(b => b.day === day);  

  const eventAfterBlock = (block) => {
  const dayBlocks = blocks.filter(b => b.day === day);

  if (day === "Friday") {
    if (block === dayBlocks[0]) return fixedEvents.Friday[1];
    if (block === dayBlocks[1]) return fixedEvents.Friday[2];
    if (block === dayBlocks[2]) return fixedEvents.Friday[3];
  }

  if (day === "Saturday" && block === dayBlocks[0]) {
    return fixedEvents.Saturday[0];
  }

  return null;
};

const openingEvent =
  day === "Friday" ? fixedEvents.Friday[0] : null;

const finalEvents =
  day === "Friday"
    ? fixedEvents.Friday.slice(4)
    : fixedEvents.Saturday.slice(1);


  const EventCard = ({ event }) => {
  const [start, end, label, type] = event;

  return (
    <section
      className={`rounded-2xl border shadow-sm ${eventStyles[type]}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 20px",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "105px",
          flex: "0 0 105px",
          borderRight: "1px solid rgba(0,0,0,.12)",
          paddingRight: "16px",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            fontSize: "17px",
            fontWeight: 700,
            lineHeight: "1.2"
          }}
        >
          {start}
        </div>

        {end && (
          <div
            style={{
              fontSize: "13px",
              marginTop: "5px",
              opacity: 0.75
            }}
          >
            to {end}
          </div>
        )}
      </div>

      <div
        style={{
          flex: "1 1 auto",
          minWidth: 0
        }}
      >
        <div
          style={{
            fontSize: "11px",
            lineHeight: "1.3",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            opacity: 0.7
          }}
        >
          Programme Event
        </div>

        <h2
          style={{
            margin: "6px 0 0 0",
            fontSize: "20px",
            lineHeight: "1.3",
            fontWeight: 700
          }}
        >
          {label}
        </h2>
      </div>

    </section>
  );
};


  return (
    <div className="min-h-screen bg-[#f6f3ed] text-slate-900">
      <header className="bg-[#132f51] text-white px-6 py-7 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1
  className="font-serif mt-2"
  style={{
    fontSize: "38px",
    lineHeight: "1.15",
    textAlign: "center"
  }}
>
  Management in Times of Geopolitical Tensions and Turmoil
</h1>
         <div
  style={{
    marginTop: "16px",
    textAlign: "center",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto"
  }}
>
  <div
    style={{
      fontSize: "22px",
      fontWeight: 600
    }}
  >
    JMS SI R&R Workshop
  </div>

  <div
    style={{
      marginTop: "6px",
      opacity: 0.9
    }}
  >
    Journal of Management Studies × Oxford Saïd Business School
  </div>

  <div
    style={{
      marginTop: "6px",
      opacity: 0.8
    }}
  >
    23–24 October 2026
  </div>
</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-7">
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-5 sticky top-2 z-10">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex rounded-xl bg-slate-100 p-1">
              {["Friday","Saturday"].map(d => (
                <button key={d} onClick={() => setDay(d)} className={`px-5 py-2 rounded-lg font-semibold ${day===d ? "bg-[#9b1c31] text-white shadow" : "text-slate-600"}`}>{d}</button>
              ))}
            </div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search paper, author or ID" className="border rounded-xl px-4 py-2 w-full sm:w-96" />
          </div>
        </section>

        <div className={query.trim() ? "space-y-2" : "space-y-5"}>

  {openingEvent && !query.trim() && (
    <EventCard event={openingEvent} />
  )}

  {blocksToShow.map((block, bi) => {
            if (!query.trim() && block.day !== day) return null;
            const event = eventAfterBlock(block);
const matchingPapers = block.items.filter(id => {
  const p = papers[id];
  return `${id} ${p.title} ${p.authors} ${block.theme}`
    .toLowerCase()
    .includes(query.toLowerCase());
});

if (query.trim() && matchingPapers.length === 0) {
  return null;
}
            return (
              <React.Fragment key={bi}>
                <section
  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm w-full"
  style={query.trim() ? { marginBottom: 0 } : {}}
>
                  {!query.trim() && (
  <div className="bg-[#d9e6ee] border-b" style={{ padding: "14px 20px" }}>
    <input
      value={block.theme}
      onChange={e => rename(bi, e.target.value)}
      className="font-serif font-bold bg-transparent w-full outline-none border-b border-transparent focus:border-[#9b1c31]"
      style={{ fontSize: "24px", lineHeight: "1.25", display: "block" }}
    />
    <p
      className="text-slate-600"
      style={{ fontSize: "12px", marginTop: "5px", marginBottom: 0 }}
    >
      {block.items.length} presentations
    </p>
  </div>
)}
                  <div className="divide-y w-full">
                    {block.items.map((id, ii) => {
                      

const slot = slotLookup[id];

const row = query.trim()
  ? {
      start: `${slot?.[0] || ""} · ${slot?.[1] || ""}-${slot?.[2] || ""}`,
      end: "",
      number: ""
    }
  : rows.find(r => r.id === id);
                      const p = papers[id];
                      const visible = `${id} ${p.title} ${p.authors} ${block.theme}`.toLowerCase().includes(query.toLowerCase());
                      if (!visible) return null;
if (query.trim()) {
  const slot = slotLookup[id];
  return (
    <article
      key={id}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
    >
      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#9b1c31"
        }}
      >
        {slot?.[0]} · {slot?.[1]}–{slot?.[2]}
      </div>

      <h2
        style={{
          fontSize: "20px",
          lineHeight: "1.3",
          marginTop: "10px",
          marginBottom: "8px"
        }}
      >
        {p.title}
      </h2>

      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.5",
          color: "#475569"
        }}
      >
        {p.authors}
      </p>

      <div
        style={{
          marginTop: "12px",
          fontSize: "13px",
          fontWeight: 500,
          color: "#64748b"
        }}
      >
        {block.theme}
      </div>
    </article>
  );
}                     
return (
                        <article
                          key={id}
                          className="w-full hover:bg-amber-50/50"
                          style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px 20px", boxSizing: "border-box" }}
                        >
                          <div style={{ width: "105px", flex: "0 0 105px", borderRight: "1px solid #e2e8f0", paddingRight: "16px", boxSizing: "border-box" }}>
                            <div className="font-bold text-[#9b1c31]" style={{ fontSize: "17px", lineHeight: "1.2" }}>{row.start}</div>
                            <div className="text-slate-500" style={{ fontSize: "13px", marginTop: "5px" }}>to {row.end}</div>
                          </div>
                          <div style={{ flex: "1 1 auto", minWidth: 0 }}>
                            <h2 className="font-semibold" style={{ fontSize: "20px", lineHeight: "1.3", margin: "5px 0 0 0", overflowWrap: "break-word" }}>{p.title}</h2>
                            {p.authors && <p className="text-slate-600" style={{ fontSize: "14px", lineHeight: "1.35", margin: "7px 0 0 0" }}>{p.authors}</p>}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
                {event && !query.trim() && <EventCard event={event} />}
              </React.Fragment>
            );
          })}

{!query.trim() &&
  finalEvents.map(event => (
    <EventCard
      key={`${event[0]}-${event[2]}`}
      event={event}
    />
  ))
}
        </div>
      </main>
    </div>
  );
}
