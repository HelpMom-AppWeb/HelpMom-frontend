import { Profile } from "../model/profile.entity.js";

export class ProfileAssembler {
    static toEntityFromResource(resource) {
        return new Profile({...resource});
    }

    static toEntityFromResponse(response) {
        if (response.data.status !== 'ok') {
            console.error(`${response.status} ${response.code} ${response.message}`);
            return null;
        }
        const profileResponse = response.data;
        return this.toEntityFromResource(profileResponse.profile);
    }

}