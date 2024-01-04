import type { FirebaseApp } from 'firebase/app'
import { getFunctions, httpsCallable, type HttpsCallable } from 'firebase/functions'
import { ref, type Ref } from 'vue'
import { normalizeBase32Code } from '@/helpers'

export interface Response {
  message: string
}

export interface BatchUpdateGamesRequest {
  passCode: string
  additions: { id: string; value: object }[]
  updates: { id: string; updates: object }[]
}

export interface RecordPlayActivityRequest {
  passCode: string
  gameId: string
  day: string
  location: string
}

export interface SetTranslationsRequest {
  passCode: string
  translations: {
    categories: object
    mechanics: object
  }
}

export class CloudFunctions {
  _passCode: Ref<string | null>
  _batchUpdateGames: HttpsCallable<BatchUpdateGamesRequest, Response>
  _recordPlayActivity: HttpsCallable<RecordPlayActivityRequest, Response>
  _setTranslations: HttpsCallable<SetTranslationsRequest, Response>

  constructor(firebaseApp: FirebaseApp, passCode: Ref<string | null>) {
    this._passCode = passCode

    // Note: the region must be the same one for the deployed function
    const functions = getFunctions(firebaseApp, 'europe-west1')
    this._batchUpdateGames = httpsCallable<BatchUpdateGamesRequest, Response>(
      functions,
      'batchUpdateGames'
    )
    this._recordPlayActivity = httpsCallable<RecordPlayActivityRequest, Response>(
      functions,
      'recordPlayActivity'
    )
    this._setTranslations = httpsCallable<SetTranslationsRequest, Response>(
      functions,
      'setTranslations'
    )
  }

  async batchUpdateGames(
    additions: { id: string; value: object }[],
    updates: { id: string; updates: object }[]
  ): Promise<void> {
    await this._batchUpdateGames({
      passCode: this._getPassCode(),
      additions,
      updates
    })
  }

  async recordPlayActivity(gameId: string, day: string, location: string): Promise<void> {
    await this._recordPlayActivity({
      passCode: this._getPassCode(),
      gameId,
      day,
      location
    })
  }

  async setTranslations(translations: { categories: object; mechanics: object }): Promise<void> {
    await this._setTranslations({
      passCode: this._getPassCode(),
      translations
    })
  }

  _getPassCode(): string {
    if (this._passCode.value) {
      return normalizeBase32Code(this._passCode.value)
    }

    throw new Error('Missing pass code')
  }
}
