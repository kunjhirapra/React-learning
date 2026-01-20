import {useState} from "react";
import "./index.css";

interface Faq {
  title: string;
  text: string;
}

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({data}: {data: Faq[]}) {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  return (
    <div className="accordion">
      {data.map((faq, i) => (
        <AccordionItem
          key={i}
          isOpen={isOpen}
          onOpen={setIsOpen}
          num={i}
          title={faq.title}
          text={faq.text}
        />
      ))}
    </div>
  );
}
// function Accordion({data}: {data: Faq[]}) {
//   const [isOpen, setIsOpen] = useState<number | null>(null);
//   return (
//     <div className={`accordion ${isOpen !== null ? "open" : ""}`}>
//       {data.map((faq, index) => (
//         <div
//           key={index}
//           onClick={() => setIsOpen(isOpen === index ? null : index)}>
//           {isOpen === index ? (
//             <AccordionItem
//               num={`0${index + 1}`}
//               title={faq.title}
//               text={faq.text}
//             />
//           ) : (
//             <div className="item closed">
//               <p className="number">{`0${index + 1}`}</p>
//               <p className="text">{faq.title}</p>
//               <p className="icon">+</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
interface AccordionItemProps extends Faq {
  num: number;
  isOpen: number | null;
  onOpen: (num: number | null) => void;
}
function AccordionItem({num, title, text, isOpen, onOpen}: AccordionItemProps) {
  const isExpanded = num === isOpen;
  function handleToggle() {
    onOpen(isExpanded ? null : num);
  }
  return (
    <div className={`item ${isExpanded ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : `${num + 1}`}</p>
      <p className="text">{title}</p>
      <p className="icon">{isExpanded ? "-" : "+"}</p>
      {isExpanded ? <div className="content-box">{text}</div> : null}
    </div>
  );
}
