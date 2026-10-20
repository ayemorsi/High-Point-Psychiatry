import type { SiteImage } from "@/lib/types"

const photo = (name: string, alt: string): SiteImage => ({
  src: `/images/people/${name}.jpg`,
  alt,
})

// Every photo on the site. Swap a file and keep its name, and every page that uses it follows.
export const photos = {
  videoCall: photo(
    "video-call",
    "Man smiling and talking on a video call at his desk at home"
  ),
  armchair: photo(
    "armchair",
    "Woman with gray hair seated in an armchair, listening thoughtfully"
  ),
  window: photo(
    "window",
    "Man in a linen shirt sitting quietly by a large window"
  ),
  meditation: photo(
    "meditation",
    "Woman sitting cross-legged on a couch with her eyes closed, breathing easy"
  ),
  beardedMan: photo(
    "bearded-man",
    "Man with a short gray beard in a green sweater, smiling warmly"
  ),
  elderWoman: photo(
    "elder-woman",
    "Older woman with white hair in a cream turtleneck, gently smiling"
  ),
  youngMan: photo(
    "young-man",
    "Young man with curly hair in a white sweater, calm and smiling"
  ),
  longHair: photo(
    "long-hair",
    "Woman with long dark hair in a cream sweater, relaxed and smiling"
  ),
  studying: photo(
    "studying",
    "Woman in a headscarf writing in a notebook at a desk, smiling"
  ),
  athlete: photo(
    "athlete",
    "Man in workout clothes resting on outdoor steps, looking ahead calmly"
  ),
  darkSweater: photo(
    "dark-sweater",
    "Man with dark hair and a beard in a navy sweater, smiling at home"
  ),
  waterside: photo(
    "waterside",
    "Man in a cap sitting by the water at golden hour, smiling"
  ),
  livingRoom: photo(
    "living-room",
    "Woman in a headscarf sitting in a bright living room, smiling"
  ),
} satisfies Record<string, SiteImage>
