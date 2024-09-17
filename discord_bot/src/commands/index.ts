import * as ping from "./ping";
import * as permissions from "./admin/permissions";
import * as settings from "./admin/settings";
import * as admin from "./admin/admin";
import * as reset from "./admin/reset";
import * as purge from "./admin/purge";
import * as stats from "./admin/stats";
import * as profile from "./general/profile";
import * as membership from "./general/membership";
import * as wompwomp from "./general/wompwomp";

export const commands = {
    ping,
    permissions,
    admin,
    settings,
    reset,
    purge,
    profile,
    membership,
    stats,
    wompwomp
};
