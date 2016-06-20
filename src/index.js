/*
 * Copyright 2016 Heroic Labs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*eslint-disable max-len */

export {Client, Response} from './client';
export {Session} from './session';
export {PingRequest} from './ping';
export {ServerRequest} from './server';
export {LoginTangoRequest, LoginFacebookRequest, LoginGoogleRequest, LoginAnonymousRequest, LoginEmailRequest, CreateEmailRequest, EmailPasswordResetRequest} from './account_login';
export {CheckTangoRequest, CheckFacebookRequest, CheckGoogleRequest, CheckAnonymousRequest, CheckEmailRequest} from './account_check';
export {LinkTangoRequest, LinkFacebookRequest, LinkGoogleRequest, LinkAnonymousRequest} from './account_link';
export {UnlinkTangoRequest, UnlinkFacebookRequest, UnlinkGoogleRequest, UnlinkAnonymousRequest, UnlinkEmailRequest} from './account_unlink';
export {GameGetRequest} from './game';
export {GamerGetRequest, GamerUpdateRequest} from './gamer';
export {StorageGetRequest, StoragePutRequest, StorageDeleteRequest} from './storage';
export {AchievementListRequest, AchievementUpdateRequest} from './achievement';
export {LeaderboardListRequest, LeaderboardGetRequest, LeaderboardAndRankGetRequest, LeaderboardUpdateRequest} from './leaderboard';
export {MatchListRequest, MatchesSinceRequest, MatchGetRequest, MatchTurnGetRequest, MatchTurnSubmitRequest} from './match';
export {MatchTurnEndRequest, MatchTurnLeaveRequest, MatchCreateRequest, MatchMakeRequest} from './match';
export {SharedStorageGetRequest, SharedStoragePublicPutRequest, SharedStoragePublicPatchRequest, SharedStoragePublicDeleteRequest, SharedStorageSearchRequest} from './shared_storage';
export {ExecuteScriptRequest} from './script';
export {MessageListRequest, MessageReadRequest, MessageDeleteRequest} from './message';
export {DatastoreGetRequest, DatastorePutRequest, DatastoreUpdateRequest, DatastoreDeleteRequest, DatastoreSearchRequest} from './datastore';

/*eslint-enable max-len */
