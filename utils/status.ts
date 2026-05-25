import { ApplicationStatus } from '@/types';

export function statusLabel(status: ApplicationStatus) {
  switch (status) {
    case 'PENDING':
      return '대기';
    case 'REVIEWING':
      return '검토 중';
    case 'ACCEPTED':
      return '합격';
    case 'REJECTED':
      return '불합격';
  }
}
