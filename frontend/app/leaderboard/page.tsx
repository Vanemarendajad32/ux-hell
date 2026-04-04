import LeaderboardDataLoader from "./_components/leaderboard-data-loader";
import {
  parseLeaderboardGame,
  parseLeaderboardSource,
} from "./_lib/leaderboard-data";

type LeaderboardPageProps = {
  searchParams?: Promise<{
    from?: string;
    game?: string;
  }>;
};

export default async function LeaderboardPage({
  searchParams,
}: LeaderboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedGame = parseLeaderboardGame(resolvedSearchParams?.game);
  const source = parseLeaderboardSource(resolvedSearchParams?.from);

  return (
    <LeaderboardDataLoader
      key={`${selectedGame}-${source}`}
      selectedGame={selectedGame}
      source={source}
    />
  );
}
