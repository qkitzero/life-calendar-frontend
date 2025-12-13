import { Event } from '@/types/event';

export const getDefaultEvents = (birthDate: Date): Event[] => {
  return [
    {
      id: '1',
      title: 'Elementary School',
      description: 'Ages 6 to 12',
      startTime: new Date(birthDate.getFullYear() + 6, birthDate.getMonth(), birthDate.getDate()),
      endTime: new Date(
        birthDate.getFullYear() + 12,
        birthDate.getMonth(),
        birthDate.getDate() - 1,
      ),
      color: '#fca5a5',
    },
    {
      id: '2',
      title: 'Middle School',
      description: 'Ages 12 to 15',
      startTime: new Date(birthDate.getFullYear() + 12, birthDate.getMonth(), birthDate.getDate()),
      endTime: new Date(
        birthDate.getFullYear() + 15,
        birthDate.getMonth(),
        birthDate.getDate() - 1,
      ),
      color: '#93c5fd',
    },
    {
      id: '3',
      title: 'High School',
      description: 'Ages 15 to 18',
      startTime: new Date(birthDate.getFullYear() + 15, birthDate.getMonth(), birthDate.getDate()),
      endTime: new Date(
        birthDate.getFullYear() + 18,
        birthDate.getMonth(),
        birthDate.getDate() - 1,
      ),
      color: '#fde047',
    },
    {
      id: '4',
      title: 'University',
      description: 'Ages 18 to 22',
      startTime: new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate()),
      endTime: new Date(
        birthDate.getFullYear() + 22,
        birthDate.getMonth(),
        birthDate.getDate() - 1,
      ),
      color: '#a7f3d0',
    },
    {
      id: '5',
      title: 'First Job',
      description: 'Ages 22 to 25',
      startTime: new Date(birthDate.getFullYear() + 22, birthDate.getMonth(), birthDate.getDate()),
      endTime: new Date(
        birthDate.getFullYear() + 25,
        birthDate.getMonth(),
        birthDate.getDate() - 1,
      ),
      color: '#d8b4fe',
    },
  ];
};
