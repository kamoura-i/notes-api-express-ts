import express from "express";
const app = express();

//Middlewares
app.use(express.json());

interface Note {
  id: number;
  title: string;
  content: string;
}

let nextId = 3;

const notes: Note[] = [
  { id: 1, title: "Estudar Express", content: "Aprender rotas HTTP" },
  { id: 2, title: "Estudar TypeScript", content: "Aprender tipagem" },
];

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const result = notes.find((note) => note.id === id);

  if (!result) {
    return res.status(404).json({ error: "Anotação não encontrada" });
  }

  res.json(result);
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;


  if (typeof title !== "string" || typeof content !== "string") {
  res.status(400).json({
    error: "Título e conteúdo devem ser textos"
  });
  return;
}

  if (!title.trim() || !content.trim()) {
    res.status(400).json({
      error: "Título e conteúdo são obrigatórios",
    });
    return;
  }


  const newNote = {
    id: nextId,
    title,
    content,
  };

  nextId++;
  notes.push(newNote);
  res.status(201).json(newNote);
});



app.patch("/notes/:id", (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)

  const {title, content} = req.body

  if(note === undefined){
    return res.status(404).json({
      error: "Não foi encontrado o ID"
    })
  }

  if(title !== undefined && typeof title !== "string"){
    return res.status(400).json({
        error: "O título deve ser um texto"
      });
  }

  if(content !== undefined && typeof content !== "string"){
    return res.status(400).json({
        error: "O conteúdo deve ser um texto"
      });
  }


  if(title === undefined && content === undefined){
    return res.status(400).json({
        error: "Atualize pelo menos um campo"
    })
  }

  if (title !== undefined && !title.trim()) {
    return res.status(400).json({
      error: "O título não pode estar vazio"
    });
  }
  if (content !== undefined && !content.trim()) {
    return res.status(400).json({
      error: "O conteúdo não pode estar vazio"
    });
  }

  if (title !== undefined) {
    note.title = title;
  }

  if (content !== undefined) {
    note.content = content;
}

  res.status(200).json(note)

  
  
})




app.listen(3000, () => {
  console.log("Servidor Rodando");
});
