import * as ping from "./ping";
import * as permissions from "./admin/permissions";
import * as settings from "./admin/settings";
import * as membership from "./admin/membership";
import * as users from "./admin/users";
import * as reset from "./admin/reset";
import * as purge from "./admin/purge";
import * as claim from "./general/claim";
import * as unclaim from "./general/unclaim";
import * as register from "./general/register";
import * as unregister from "./general/unregister";
import * as profile from "./general/profile";

export const commands = {
    ping,
    permissions,
    users,
    membership,
    settings,
    reset,
    purge,
    claim,
    unclaim,
    register,
    unregister,
    profile
};