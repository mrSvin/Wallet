package Wallet.service;

import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class authGoogle {

    public void auth() throws IOException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream("/path/to/credentials.json"));
        credentials.refreshIfExpired();
        AccessToken token = credentials.getAccessToken();

    }
}
