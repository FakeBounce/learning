import { render, screen } from '@testProvider';
import ExternalTestersProfileInfos from '@src/pages/externalTesters/externalTesters-profile/ExternalTestersProfileInfos';
import { useNavigate } from 'react-router-dom';
import { stateTester, stateTesterDisabled } from '@src/tests/pages/externalTesters/DefaultTesters';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ExternalTestersProfileInfos', () => {
  it('renders ExternalTestersProfileInfos correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ExternalTestersProfileInfos />, {
      preloadedState: {
        applicants: {
          applicantProfile: {
            applicantProfileData: stateTester
          }
        }
      }
    });

    expect(screen.getByText(stateTester.firstname)).toBeInTheDocument();
    expect(screen.getByText(stateTester.lastname)).toBeInTheDocument();
    expect(screen.getByText(stateTester.email)).toBeInTheDocument();
  });

  it('renders a disabled profile correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ExternalTestersProfileInfos />, {
      preloadedState: {
        applicants: {
          applicantProfile: {
            applicantProfileData: stateTesterDisabled
          }
        }
      }
    });

    expect(screen.getByText(stateTesterDisabled.email)).toBeInTheDocument();
  });
});
