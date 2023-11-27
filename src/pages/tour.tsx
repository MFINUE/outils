import { Box, Container, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormEventHandler, useCallback, useRef, useState } from "react";

export default function TourCreator() {
     const [output, setOutput] = useState<any>({});

     const form = useRef<HTMLFormElement>(null);

     const handleChange = useCallback(((ev) => {
          const data = new FormData(ev.currentTarget)

          setOutput({
               id: data.get("id"),
               name: data.get("name"),
               map: data.get("map"),
               photo: data.get("photo"),
          })
     }) as FormEventHandler<HTMLFormElement>, [])

     return <>
          <Container maxWidth="xl" sx={{ mt: 3 }}>
               <Typography variant="h4">Créateur de parcour</Typography>
               <Divider />
               <Box component="form" ref={form} noValidate autoComplete="off" mt={3} pb={5} onChange={handleChange}>
                    <Stack flexDirection="row" mb={2}>
                         <TextField
                              fullWidth
                              required
                              name="id"
                              label="Identifiant"
                              defaultValue="galata"
                              helperText="Peut-être n'importe quoi, il faut juste qu'il soit unique."
                         />
                         <Box mx={4} />
                         <TextField
                              fullWidth
                              required
                              name="name"
                              label="Nom"
                              defaultValue="Galata"
                         />
                    </Stack>

                    <TextField
                         fullWidth
                         required
                         label="Lien du Google Maps"
                         name="map"
                         defaultValue="https://www.google.com/maps/d/u/0/edit?mid=1CT8ls1ODHfVbdophHCgTG2R3lhk_fvQ&usp=sharing"
                         sx={{ mb: 4 }}
                    />

                    <TextField
                         fullWidth
                         required
                         label="Lien du photo"
                         name="photo"
                         defaultValue="https://mfinue.org/wp-content/uploads/2023/11/galata-tour-scaled.jpeg"
                         helperText="Le photo doit être 1:1 (format carré)"
                    />
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
                              {JSON.stringify(output)}
                         </span>
                    </Typography>
               </Paper>
          </Container>
     </>
}