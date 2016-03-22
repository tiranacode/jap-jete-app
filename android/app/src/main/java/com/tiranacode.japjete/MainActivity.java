package com.tiranacode.japjete;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import me.neo.react.StatusBarPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
/*import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;*/
import com.oney.gcm.GcmPackage;
import io.neson.react.notification.NotificationPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "JapJete";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new FacebookLoginPackage(),
                new ReactNativeLocalizationPackage(),
                new StatusBarPackage(this),
                new VectorIconsPackage(),
                /*new ReactNativeDialogsPackage(this),*/
                new ReactMaterialKitPackage(),
                new GcmPackage(),
                new NotificationPackage(this)
        );
    }
}
