
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.ecaptureinc.open.BuildConfig;
import com.ecaptureinc.open.R;

// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-mail
import com.chirag.RNMail.RNMail;
// react-native-orientation
import com.github.yamill.orientation.OrientationPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-signature-capture
import com.rssignaturecapture.RSSignatureCapturePackage;
// react-native-uuid-generator
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
// react-native-view-pdf
import com.rumax.reactnative.pdfviewer.PDFViewPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.reactNativeHost = null;
    this.application = application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new AsyncStoragePackage(),
      new FastImageViewPackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new RNMail(),
      new OrientationPackage(),
      new RNSharePackage(),
      new RSSignatureCapturePackage(),
      new RNUUIDGeneratorPackage(),
      new PDFViewPackage(),
      new RNCWebViewPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
