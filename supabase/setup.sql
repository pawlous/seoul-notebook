begin;
create table if not exists public.travel_notes (
 user_id uuid not null references auth.users(id) on delete cascade,
 stop_id text not null,
 content text not null check (char_length(content) <= 10000),
 primary key (user_id, stop_id)
);
alter table public.travel_notes enable row level security;
revoke all on public.travel_notes from anon;
revoke all on public.travel_notes from authenticated;
grant select, insert, update on public.travel_notes to authenticated;
drop policy if exists "Read own travel notes" on public.travel_notes;
create policy "Read own travel notes" on public.travel_notes for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Insert own travel notes" on public.travel_notes;
create policy "Insert own travel notes" on public.travel_notes for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Update own travel notes" on public.travel_notes;
create policy "Update own travel notes" on public.travel_notes for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
commit;
