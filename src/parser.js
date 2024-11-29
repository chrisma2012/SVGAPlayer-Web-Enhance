import { VideoEntity } from './videoEntity'
import MockWorker from './mockWorker'

export class Parser {

    /**
     * url: 资源路径
     * success(VideoEntity videoItem)
     */
    _videoEntity=undefined

    load(url, success, failure) {
        this.loadViaWorker(url, success, failure);
    }

    loadViaWorker(url, success, failure) {
        MockWorker(url, (data) => {
            let movie = data.movie;
            movie["version"] = data.ver;
            let images = data.images;
            this._videoEntity = new VideoEntity(movie, images);
            success(this._videoEntity);
        }, failure)
    }

    destroy(){  //自己增加的销毁方法
       this._videoEntity = null
    }

}