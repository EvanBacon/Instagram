import { Link, Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerLeft(props) {
          return (
            <Link href="/">
              <p>Back</p>
            </Link>
          );
        },
      }}
    />
  );
}
