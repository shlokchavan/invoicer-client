import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConfig } from 'src/app/configs/global-config';
import { environment } from 'src/environments/environment';
import { EncryptedStorage } from '../utils/encrypted-storage';

@Injectable()
export class ThemeService {

    private themeActive = new BehaviorSubject('');
    private themeCollection = new BehaviorSubject([]);
    loadThemeCollection = this.themeCollection.asObservable();
    currentTheme = this.themeActive.asObservable();
    baseUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    changeTheme(themeSelector: any, document: Document, theme: any) {
        if(theme) {
            document.documentElement.style.setProperty('--global-theme', theme["theme-base-color"]);
            document.documentElement.style.setProperty('--global-theme-dark', theme["theme-dark-color"]);
            document.documentElement.style.setProperty('--global-theme-light', theme["theme-light-color"]);
            document.documentElement.style.setProperty("--global-theme-id", theme["theme-id"]);
            
            document.documentElement.style.setProperty('--global-theme-dark-shade-1', theme["theme-dark-color-shade-1"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-2', theme["theme-dark-color-shade-2"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-3', theme["theme-dark-color-shade-3"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-4', theme["theme-dark-color-shade-4"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-5', theme["theme-dark-color-shade-5"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-6', theme["theme-dark-color-shade-6"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-7', theme["theme-dark-color-shade-7"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-8', theme["theme-dark-color-shade-8"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-9', theme["theme-dark-color-shade-9"]);
            document.documentElement.style.setProperty('--global-theme-dark-shade-10', theme["theme-dark-color-shade-10"]);
            
            document.documentElement.style.setProperty('--global-theme-light-shade-1', theme["theme-light-color-shade-1"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-2', theme["theme-light-color-shade-2"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-3', theme["theme-light-color-shade-3"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-4', theme["theme-light-color-shade-4"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-5', theme["theme-light-color-shade-5"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-6', theme["theme-light-color-shade-6"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-7', theme["theme-light-color-shade-7"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-8', theme["theme-light-color-shade-8"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-9', theme["theme-light-color-shade-9"]);
            document.documentElement.style.setProperty('--global-theme-light-shade-10', theme["theme-light-color-shade-10"]);
            this.themeActive.next(themeSelector)
        }
    }

    storeThemeCollection(collection: any) {
        this.themeCollection.next(collection)
    }

    saveTheme(themeId: any) {
        const userData = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig()?.userAllDetailsLSName)!);
        const body = {
            "organizationId": userData?.organizationId,
            "colourThemeId": themeId, //Passed Theme Id
            "userId": userData?.userId
        }
        userData["colourThemeId"] = themeId;
        new EncryptedStorage().setItem(new GlobalConfig().userAllDetailsLSName, JSON.stringify(userData), !new EncryptedStorage().IsLocalStorage);
        return this.httpClient.post(`${this.baseUrl}/subscription-service/sub/userProfile/userProfileColourTheme`, body);
    }

    getThemes(): Observable<any> {
        return this.httpClient.get('../assets/json/' + 'theme-collection.json');
    }

}