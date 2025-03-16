import { Box, Container, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormEventHandler, useCallback, useRef, useState } from "react";

export default function TourCreator() {
     const [output, setOutput] = useState<{ name: string, job: string, photo: string, title: string }>({ name: "Bora Ciner", job: "Responsable de l'Informatique du MFINUE 2023", photo: "https://www.mfinue.org/wp-content/uploads/2023/04/logo-2023-300.png", title: "MFINUE 2023" });

     const form = useRef<HTMLFormElement>(null);

     const handleChange = useCallback(((ev) => {
          const data = new FormData(ev.currentTarget)

          setOutput({
               name: data.get("name") as string,
               job: data.get("job") as string,
               photo: data.get("photo") as string,
               title: data.get("title") as string
          })
     }) as FormEventHandler<HTMLFormElement>, [])

     return <>
          <Container maxWidth="xl" sx={{ mt: 3 }}>
               <Typography variant="h4">Créateur de signature</Typography>
               <Divider />
               <Box component="form" ref={form} noValidate autoComplete="off" mt={3} pb={5} onChange={handleChange}>
                    <Stack flexDirection="row" mb={2}>
                         <TextField
                              fullWidth
                              required
                              name="name"
                              label="Nom"
                              defaultValue="Alper Özer"
                         />
                         <Box mx={4} />
                         <TextField
                              fullWidth
                              required
                              name="job"
                              label="Tâche"
                              defaultValue="Responsable de l'Informatique du MFINUE 2025"
                         />
                    </Stack>

                    <TextField
                         fullWidth
                         required
                         label="Lien d'image"
                         name="photo"
                         defaultValue="https://mfinue.org/wp-content/uploads/2025/03/Theres-a-sphere-in-the-very-back-2.png"
                         sx={{ my: 2 }}
                    />
                    <TextField
                         fullWidth
                         required
                         name="title"
                         label="Titre"
                         defaultValue="MFINUE 2025"
                    />
               </Box>

               <Typography variant="h5">Sortie</Typography>
               <Typography variant="subtitle2" gutterBottom>Copiez d'abord l'élément ci-dessous dans la fenêtre "Nouveau Courriel". Copiez ensuite à nouveau la signature de cette fenêtre, puis collez-la dans les paramètres de signature.</Typography>
               <Divider />

               <Box sx={{ "a": { color: "#15c", textDecoration: "underline" } }} dangerouslySetInnerHTML={{
                    __html: `<table cellpadding="0" class="An" id=":ug"><tbody><tr><td class="Ap"><div id=":ul" class="IN" style="display: block;"><div id=":um" class="Am aiL IP Al editable Xp0HJf-LW-avf" hidefocus="true" aria-label="Signature" g_editable="true" role="textbox" aria-multiline="true" style="direction: ltr;"><div><br></div><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="width:75px" valign="middle"><img src="${output.photo}" alt="${output.title}" style="margin-right:18px" width="92" height="92"><br></td><td style="font-size:10pt;font-family:arial;width:375px;padding-top:0px" valign="top">
                         <span style="font-size:14pt;font-family:&quot;Trebuchet MS&quot;;color:rgb(34,34,34);vertical-align:baseline;white-space:pre-wrap">${output.name}</span><br><span style="line-height:1.5"><span>
                         <span style="font-size:11pt;font-family:&quot;Times New Roman&quot;;color:rgb(102,102,102);vertical-align:baseline;white-space:pre-wrap">${output.job}</span></span><br><span style="line-height:1.5"><span>
                         <br>
                         <span style="font-size:10pt;font-family:&quot;Arial&quot;;color:rgb(51,51,51);vertical-align:baseline;white-space:pre-wrap"><a href="https://mfinue.org" target="_blank">https://mfinue.org</a></span></span></span></span></td></tr></tbody></table></div></div></td></tr></tbody></table>` }} />
          </Container>
     </>
}
