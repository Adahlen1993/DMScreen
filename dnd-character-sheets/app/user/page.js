import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();

  // Function to handle button clicks and navigate to the respective pages
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      <div>
        <button onClick={() => navigateTo('/user/characters')}>
          My Characters
        </button>
        <button onClick={() => navigateTo('/user/campaigns')}>
          My Campaigns
        </button>
        <button onClick={() => navigateTo('/user/encounters')}>
          My Encounters
        </button>
        <button onClick={() => navigateTo('/user/homebrew')}>
          My Homebrew
        </button>
      </div>
    </div>
  );
}
