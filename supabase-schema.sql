-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Creates the table backing the visitor comments/pin-drop widget and opens it
-- up to anonymous read/write via the public "anon" API key (no login on this
-- site, so RLS is intentionally permissive — anyone with the link can add,
-- resolve, edit, or delete a comment, same as the old shared-browser behavior
-- but now synced across everyone instead of being local to one browser).

create table if not exists comments (
  id text primary key,
  slide text not null,
  x_pct double precision not null,
  y_pct double precision not null,
  name text,
  text text not null,
  resolved boolean not null default false,
  ts bigint not null
);

alter table comments enable row level security;

create policy "public can read comments" on comments
  for select using (true);

create policy "public can insert comments" on comments
  for insert with check (true);

create policy "public can update comments" on comments
  for update using (true);

create policy "public can delete comments" on comments
  for delete using (true);

-- Optional: turn on Realtime so a comment added in one browser tab shows up
-- live in another without a reload. In the dashboard: Database -> Replication
-- -> toggle "comments" on. (The app.js code subscribes to this if available
-- and silently no-ops if it isn't enabled.)
