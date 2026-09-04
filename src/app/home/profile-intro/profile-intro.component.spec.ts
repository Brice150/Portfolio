import { describe, expect, it } from 'vitest';
import { profile, profileFacts } from '../../shared/data/profile';
import { mount, textOf } from '../../../testing/mount';
import { ProfileIntroComponent } from './profile-intro.component';

describe('ProfileIntroComponent', () => {
  it('affiche l’identité et les faits du profil', async () => {
    const fixture = await mount(ProfileIntroComponent);

    expect(textOf(fixture)).toContain(profile.email);
    expect(fixture.componentInstance.facts.length).toBe(profileFacts.length);
  });
});
