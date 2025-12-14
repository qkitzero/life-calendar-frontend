import { Event } from '@/types/event';

export const getDefaultEvents = (birthDate: Date): Event[] => {
  return [
    {
      id: '1',
      title: '',
      description: '',
      startTime: new Date(
        birthDate.getFullYear() + 10,
        birthDate.getMonth() + 2,
        birthDate.getDate(),
      ),
      endTime: new Date(
        birthDate.getFullYear() + 10,
        birthDate.getMonth() + 6,
        birthDate.getDate(),
      ),
      color: '#fca5a5',
    },
    {
      id: '2',
      title: '',
      description: '',
      startTime: new Date(
        birthDate.getFullYear() + 11,
        birthDate.getMonth() + 4,
        birthDate.getDate(),
      ),
      endTime: new Date(
        birthDate.getFullYear() + 11,
        birthDate.getMonth() + 8,
        birthDate.getDate(),
      ),
      color: '#93c5fd',
    },
    {
      id: '3',
      title: '',
      description: '',
      startTime: new Date(
        birthDate.getFullYear() + 12,
        birthDate.getMonth() + 6,
        birthDate.getDate(),
      ),
      endTime: new Date(
        birthDate.getFullYear() + 12,
        birthDate.getMonth() + 10,
        birthDate.getDate(),
      ),
      color: '#fde047',
    },
    {
      id: '4',
      title: '',
      description: '',
      startTime: new Date(
        birthDate.getFullYear() + 22,
        birthDate.getMonth() + 3,
        birthDate.getDate(),
      ),
      endTime: new Date(
        birthDate.getFullYear() + 22,
        birthDate.getMonth() + 6,
        birthDate.getDate(),
      ),
      color: '#a7f3d0',
    },
    {
      id: '5',
      title: '',
      description: '',
      startTime: new Date(
        birthDate.getFullYear() + 23,
        birthDate.getMonth() + 5,
        birthDate.getDate(),
      ),
      endTime: new Date(
        birthDate.getFullYear() + 23,
        birthDate.getMonth() + 8,
        birthDate.getDate(),
      ),
      color: '#d8b4fe',
    },
  ];
};
