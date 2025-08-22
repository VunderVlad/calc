// lib/training.ts
export function buildTrainingPlan(opts: { daysPerWeek: number; equipment: 'home'|'gym'|'calisthenics'; preferredActivities: string[] }) {
  const { daysPerWeek, equipment, preferredActivities } = opts;
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const pickCardio = () => (preferredActivities[0] || 'Cardio/Steps 30–45 min');

  const gymUpper = ['Bench/Push‑ups 4x6‑10','Row/Pull‑ups 4x6‑10','Shoulder press 3x8‑12','Triceps 3x10‑12','Biceps 3x10‑12'];
  const gymLower = ['Squat 4x6‑10','RDL 4x6‑10','Lunges 3x10','Leg curl 3x10','Calves 4x12‑15'];
  const homeFull = ['Push‑ups 4xAMRAP','Rows (table/band) 4x10‑15','Split squats 3x10‑12','Glute bridge 3x12','Plank 3x45s'];
  const caliPull = ['Pull‑ups/Assisted 5x5','Australian rows 4x10‑12','Curls (band) 3x12','Rear delts 3x15'];
  const caliPush = ['Dips/Bench dips 5x5‑8','Push‑ups variations 4xAMRAP','Pike push‑ups 4x6‑10','Triceps 3x12'];
  const caliLegs = ['Squats 5x12‑15','RDL (backpack) 4x10','Lunges 3x12','Calves 4x15','Core 3x'];

  const plan: { day: string; title: string; exercises: string[] }[] = [];

  if (equipment === 'gym') {
    if (daysPerWeek <= 3) {
      plan.push({ day: days[0], title: 'Full Body A', exercises: [...gymUpper.slice(0,2), ...gymLower.slice(0,2), 'Core 3x'] });
      plan.push({ day: days[2], title: 'Full Body B', exercises: [...gymUpper.slice(2), ...gymLower.slice(2), 'Core 3x'] });
      plan.push({ day: days[4], title: pickCardio(), exercises: [] });
    } else if (daysPerWeek === 4) {
      plan.push({ day: days[0], title: 'Upper', exercises: gymUpper });
      plan.push({ day: days[1], title: 'Lower', exercises: gymLower });
      plan.push({ day: days[3], title: 'Upper (var)', exercises: gymUpper });
      plan.push({ day: days[4], title: 'Lower (var)', exercises: gymLower });
    } else {
      plan.push({ day: days[0], title: 'Push', exercises: ['Bench/Push‑ups 4x','Incline/Shoulders 4x','Triceps 3x'] });
      plan.push({ day: days[1], title: 'Pull', exercises: ['Pull‑ups/Lat pulldown 4x','Row 4x','Biceps 3x'] });
      plan.push({ day: days[2], title: 'Legs', exercises: gymLower });
      plan.push({ day: days[4], title: pickCardio(), exercises: [] });
      if (daysPerWeek === 6) plan.push({ day: days[5], title: 'Full Body/Weak point', exercises: ['Choose 3‑4 lifts 3x8‑12','Core 3x'] });
    }
  } else if (equipment === 'calisthenics') {
    if (daysPerWeek === 3) {
      plan.push({ day: days[0], title: 'Pull focus', exercises: caliPull });
      plan.push({ day: days[2], title: 'Push focus', exercises: caliPush });
      plan.push({ day: days[4], title: 'Legs + Core', exercises: caliLegs });
    } else {
      plan.push({ day: days[0], title: 'Push', exercises: caliPush });
      plan.push({ day: days[1], title: 'Pull', exercises: caliPull });
      plan.push({ day: days[2], title: 'Legs', exercises: caliLegs });
      if (daysPerWeek >= 5) plan.push({ day: days[4], title: pickCardio(), exercises: [] });
      if (daysPerWeek === 6) plan.push({ day: days[5], title: 'Skills/Mobility', exercises: ['Handstand practice','Hollow holds','Scapular work'] });
    }
  } else { // home
    const fb = homeFull;
    if (daysPerWeek <= 3) {
      plan.push({ day: days[0], title: 'Full Body A', exercises: fb });
      plan.push({ day: days[2], title: 'Full Body B', exercises: fb });
      plan.push({ day: days[4], title: pickCardio(), exercises: [] });
    } else {
      plan.push({ day: days[0], title: 'Upper/Core', exercises: ['Push‑ups 4x','Rows 4x','Shoulders 3x','Core 3x'] });
      plan.push({ day: days[1], title: 'Lower', exercises: ['Split squats 4x','RDL backpack 4x','Calves 4x','Core 3x'] });
      plan.push({ day: days[3], title: 'Full Body Circuit', exercises: ['10‑12 exercises x 3 rounds'] });
      if (daysPerWeek >= 5) plan.push({ day: days[4], title: pickCardio(), exercises: [] });
      if (daysPerWeek === 6) plan.push({ day: days[5], title: 'Mobility', exercises: ['Hip/Thoracic sequence 15‑20 min'] });
    }
  }

  return plan;
}