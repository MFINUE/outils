import { Box, Container, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Slider, Stack, TextField, Typography } from "@mui/material";
import { FormEventHandler, useCallback, useEffect, useRef, useState } from "react";

const TopicForm = (props: { index: number }) => {
     const [sdg1, setSDG1] = useState<number>()
     const [sdg2, setSDG2] = useState<number>()
     return <>
          <Stack flexDirection="row" mb={2}>
               <TextField
                    required
                    name={`t-title-${props.index}`}
                    label="Titre"
                    fullWidth
                    defaultValue="Garantir le respect des espaces aériens et maritimes nationaux"
               />
               <Box mx={1} />
               <FormControl sx={{ width: 120 }} component="div">
                    <InputLabel>SDG 1</InputLabel>
                    <Select
                         value={sdg1}
                         label="SDG 1"
                         name={`t-sdg1-${props.index}`}
                         onChange={(e, c: any) => setSDG1(c.value ? Number(c.value) : undefined)}
                    >
                         <MenuItem>Aucun</MenuItem>
                         {
                              Array.from({ length: 17 }, (v, i) => <MenuItem value={i + 1}>{i + 1}</MenuItem>)
                         }
                    </Select>
               </FormControl>
               <Box mx={1} />
               <FormControl sx={{ width: 120 }} component="div">
                    <InputLabel>SDG 2</InputLabel>
                    <Select
                         value={sdg2}
                         label="SDG 2"
                         name={`t-sdg2-${props.index}`}
                         onChange={(e, c: any) => setSDG2(c.value ? Number(c.value) : undefined)}
                    >
                         <MenuItem>Aucun</MenuItem>
                         {
                              Array.from({ length: 17 }, (v, i) => <MenuItem value={i + 1}>{i + 1}</MenuItem>)
                         }
                    </Select>
               </FormControl>
          </Stack>
          <TextField label="Description" name={`t-description-${props.index}`} multiline minRows={2} defaultValue="Le maintien de la paix entre nations voisines implique le respect non seulement de leurs frontières terrestres, mais également de leur espace aérien et maritime national. C’est pourquoi la reconnaissance et la protection de la souveraineté et du contrôle sur..." />
     </>
}

export default function CommitteeCreator() {
     const [topics, setTopics] = useState(0);
     const [output, setOutput] = useState<any>({});

     const form = useRef<HTMLFormElement>(null);

     const handleChange = useCallback(((ev) => {
          const data = new FormData(ev.currentTarget)

          setOutput({
               id: data.get("id"),
               name: data.get("name"),
               description: data.get("description"),
               topics: Array.from({ length: Number(data.get("topic-n") as string) }, (_, i) => ({
                    title: data.get(`t-title-${i}`),
                    description: data.get(`t-description-${i}`),
                    SDG: [data.get(`t-sdg1-${i}`), data.get(`t-sdg2-${i}`)].filter(x => !!x).map(x => Number(x))
               }))
          })
     }) as FormEventHandler<HTMLFormElement>, [])

     useEffect(() => {
          if (typeof window !== "undefined" && form.current) {
               const int = setInterval(() => {
                    handleChange({ currentTarget: form.current } as any)
               }, 100)

               return () => clearInterval(int)
          }
     }, [form])

     return <>
          <Container maxWidth="xl" sx={{ mt: 3 }}>
               <Typography variant="h4">Créateur de comité</Typography>
               <Divider />
               <Box component="form" ref={form} noValidate autoComplete="off" mt={3} pb={5} onChange={handleChange}>
                    <Stack flexDirection="row" mb={2}>
                         <TextField
                              fullWidth
                              required
                              name="id"
                              label="Identifiant"
                              defaultValue="ag-1"
                              helperText="Peut-être n'importe quoi, il faut juste qu'il soit unique."
                         />
                         <Box mx={4} />
                         <TextField
                              fullWidth
                              required
                              name="name"
                              label="Nom"
                              defaultValue="AG1"
                         />
                    </Stack>

                    <TextField
                         fullWidth
                         required
                         label="Description"
                         name="description"
                         defaultValue="Comité de Désarmement"
                    />

                    <Container maxWidth="xs" sx={{ mx: "0", pl: "0 !important", my: 2 }}>
                         <Typography>Quantité de sujets</Typography>
                         <Slider
                              defaultValue={0}
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={4}
                              onChangeCommitted={(_, v) => setTopics(v as number)}
                              name="topic-n"
                         />
                    </Container>

                    <Stack spacing={4} divider={<Divider />}>
                         {Array.from({ length: topics }, (_, i) => <TopicForm index={i} />)}
                    </Stack>
               </Box>

               <Typography variant="h5" gutterBottom>Sortie</Typography>
               <Paper variant="outlined" sx={{ bgcolor: "#282C34", mb: 20 }} onClick={(ev) => {
                    const range = document.createRange()

                    range.selectNodeContents(ev.currentTarget.childNodes.item(0)!.childNodes.item(1))

                    window.getSelection()?.removeAllRanges()
                    window.getSelection()?.addRange(range)
                    navigator.clipboard.writeText(ev.currentTarget.childNodes.item(0)!.childNodes.item(1)!.textContent!)
               }}>
                    <Typography fontFamily="monospace" color="white" p={1}>
                         <span style={{ opacity: .4, userSelect: "none", paddingRight: 12 }}>descartes/functions{">"}</span>
                         <span id="selectable-output" style={{ wordBreak: "break-all" }}>
                              <span style={{ color: "yellow" }}>npm run</span> <span style={{ color: "#17AF61" }}>create-committee</span> {[...JSON.stringify(output)].map(x => x.charCodeAt(0)).join("A")}
                         </span>
                    </Typography>
               </Paper>
          </Container>
     </>
}