import { Box, Button, Container, Divider, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Tour {
  guides: { [displayName: string]: string }; // second string is the PFP URL.
  participants: { [uid: string]: string };
  map: string;
  name: string;
  photoURL: string;
  brochureURL: string;
  driveURL: string;
}

export default function TourCreator() {
  const [output, setOutput] = useState<any>({
    id: '',
    name: '',
    map: '',
    photo: '',
    driveURL: '', // New driveURL field
    guides: [{ name: "", pfp: "" }] // Guide as an object with name and pfp fields
  });

  const handleChange = (field: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    setOutput((prevOutput: any) => ({
      ...prevOutput,
      [field]: ev.target.value
    }));
  };

  const handleGuideChange = (index: number, field: "name" | "pfp") => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newGuides = [...output.guides];
    newGuides[index][field] = ev.target.value; // Update the specific guide's name or pfp
    setOutput((prevOutput: any) => ({
      ...prevOutput,
      guides: newGuides
    }));
  };

  const handleAddGuide = () => {
    setOutput((prevOutput: { guides: any; }) => ({
      ...prevOutput,
      guides: [...prevOutput.guides, { name: "", pfp: "" }] // Add a new guide with name and pfp fields
    }));
  };

  const handleRemoveGuide = (index: number) => {
    setOutput((prevOutput: { guides: any[]; }) => ({
      ...prevOutput,
      guides: prevOutput.guides.filter((_, i: number) => i !== index) // Remove guide by index
    }));
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Typography variant="h4">Créateur de parcour</Typography>
        <Divider />
        <Box component="form" noValidate autoComplete="off" mt={3} pb={5}>
          <Stack flexDirection="row" mb={2}>
            <TextField
              fullWidth
              required
              name="id"
              label="Identifiant (ex: galata)"
              value={output.id}
              onChange={handleChange("id")}
              helperText="Peut-être n'importe quoi, il faut juste qu'il soit unique."
            />
            <Box mx={4} />
            <TextField
              fullWidth
              required
              name="name"
              label="Nom (ex: Galata)"
              value={output.name}
              onChange={handleChange("name")}
            />
          </Stack>

          <TextField
            fullWidth
            required
            label="Lien du Google Maps"
            name="map"
            value={output.map}
            onChange={handleChange("map")}
            sx={{ mb: 4 }}
          />

          <TextField
            fullWidth
            required
            label="Lien du photo"
            name="photo"
            value={output.photo}
            onChange={handleChange("photo")}
            helperText="Le photo doit être 1:1 (format carré)"
          />

          {/* New Drive URL Input */}
          <TextField
            fullWidth
            label="Lien du Google Drive"
            name="driveURL"
            value={output.driveURL}
            onChange={handleChange("driveURL")}
            helperText="Lien vers les ressources supplémentaires sur Google Drive"
            sx={{ mb: 4 }}
          />

          {/* Guide Input Fields */}
          <Typography variant="h6" mt={2}>Guides</Typography>
          {output.guides.map((guide: any, index: number) => (
            <Stack key={index} direction="row" alignItems="center" mb={2} spacing={2}>
              <TextField
                fullWidth
                label={`Nom de Guide ${index + 1}`}
                value={guide.name}
                onChange={handleGuideChange(index, "name")}
              />
              <TextField
                fullWidth
                label={`Photo URL de ${output.guides[index].name.length > 0 ? output.guides[index].name : "Guide " + (index + 1)}`}
                value={guide.pfp}
                onChange={handleGuideChange(index, "pfp")}
                placeholder="Lien du photo (ex: https://...)"
              />
              <IconButton aria-label="remove" onClick={() => handleRemoveGuide(index)} sx={{ ml: 2 }}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddGuide}
          >
            Ajouter un Guide
          </Button>
        </Box>

        {/* New Video URL Input */}
        <TextField
        fullWidth
        label="Lien de la Vidéo"
        name="videoURL"
        value={output.videoURL}
        onChange={handleChange("videoURL")}
        helperText="Lien vers la vidéo supplémentaire"
        sx={{ mb: 4 }}
        />

        <Typography variant="h5" gutterBottom>Sortie</Typography>
        <Paper variant="outlined" sx={{ bgcolor: "#282C34", mb: 20 }} onClick={(ev) => {
          const range = document.createRange();
          range.selectNodeContents(ev.currentTarget.childNodes.item(0)!.childNodes.item(1));
          window.getSelection()?.removeAllRanges();
          window.getSelection()?.addRange(range);
          navigator.clipboard.writeText(ev.currentTarget.childNodes.item(0)!.childNodes.item(1)!.textContent!);
        }}>
          <Typography fontFamily="monospace" color="white" p={1}>
            <span style={{ opacity: .4, userSelect: "none", paddingRight: 12 }}>descartes/functions{">"}</span>
            <span id="selectable-output" style={{ wordBreak: "break-all" }}>
              {JSON.stringify(output, null, 2)}
            </span>
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
