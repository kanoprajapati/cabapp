import { Chip } from '@mui/material';

// props: dutyGroup, selectedDuty, onSelectDuty

export default function DutyTypeChip({ dutyGroup, selectedDuty, onSelectDuty }) {
  return (
    <Chip
      label={dutyGroup}
      clickable
      color={selectedDuty === dutyGroup ? "primary" : "default"}
      sx={{
        borderRadius: '20px',
        px: 2,
        py: 1,
        marginTop: 1,
        fontWeight: 600,
        fontSize: 15,
        mx: 1,
        boxShadow: selectedDuty === dutyGroup ? '0 2px 8px #2196f366' : undefined,
        transition: 'all 0.2s',
      }}
      onClick={() => onSelectDuty(dutyGroup)}
    />
  );
}
