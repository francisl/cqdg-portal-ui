module ngApp.cart.controllers {
  import ICartService = ngApp.cart.services.ICartService;
  import IFiles = ngApp.files.models.IFiles;
  import IFile = ngApp.files.models.IFile;
  import ICoreService = ngApp.core.services.ICoreService;
  import IUserService = ngApp.components.user.services.IUserService;
  import IPagination = ngApp.components.tables.pagination.models.IPagination;

  export interface ICartController {
    files: IFile[];
    lastModified: Moment;
    selected(): IFile[];
    selectedSize(): number;
    getTotalSize(): number;
    removeSelected(): void;
    getFileIds(): string[];
    getRelatedFileIds(): string[];
    processPaging: boolean;
    pagination: IPagination;
    checkCartForClosedFiles();
  }

  class CartController implements ICartController {
    lastModified: Moment;
    pagination: any = {};
    processPaging: boolean = true;
    displayedFiles: IFile[];
    numberFilesGraph: any;
    sizeFilesGraph: any;

    /* @ngInject */
    constructor(private $scope: ng.IScope,
                public files: IFile[],
                private CoreService: ICoreService,
                private CartService: ICartService,
                private UserService: IUserService,
                private CartTableModel,
                private Restangular,
                private FilesService) {
      CoreService.setPageTitle("Cart", "(" + this.files.length + ")");
      this.lastModified = this.CartService.lastModified;
      this.cartTableConfig = CartTableModel;

      this.pagination = {
        from: 1,
        size: 20,
        count: 10,
        page: 1,
        pages: Math.ceil(files.length / 10),
        total: files.length,
        sort: ""
      };

      $scope.$on("gdc-user-reset", () => {
        this.files = CartService.getFiles();
      });

      $scope.$on("undo", () => {
        this.files = CartService.getFiles();
      });

      $scope.$on("cart-update", () => {
        this.lastModified = this.CartService.lastModified;
        this.files = CartService.getFiles();
      });
    }

    selected(): IFile[] {
      return this.CartService.getSelectedFiles();
    }

    selectedSize(): number {
      return this.getSelectedSize();
    }

    getTotalSize(): number {
      return _.reduce(this.files, function (sum: number, hit: IFile) {
        return sum + hit.file_size;
      }, 0);
    }

    getFileIds(): string[] {
      return _.pluck(this.files, "file_id");
    }

    getRelatedFileIds(files): string[] {
      return _.reduce(this.files, function (ids, file) {
        return ids.concat(file.related_ids);
      }, []);
    }

    getSelectedSize(): number {
      return _.reduce(this.selected(), function (sum: number, hit: IFile) {
        return sum + hit.file_size;
      }, 0);
    }

    removeAll() {
      this.CartService.removeAll();
      this.lastModified = this.CartService.lastModified;
      this.files = this.CartService.getFiles();
    }

    removeSelected(): void {
      var ids: string[] = _.pluck(this.selected(), "file_id");
      this.CartService.remove(ids);
      this.lastModified = this.CartService.lastModified;
      this.files = this.CartService.getFiles();
    }

    getManifest() {
      var authorizedInCart = this.CartService.getAuthorizedFiles()
          .filter(function isSelected(a) {
            return a.selected;
          });

      var file_ids = [];
      _.forEach(authorizedInCart, (f) => {
        if (f.hasOwnProperty('related_ids') && f.related_ids) {
          file_ids = file_ids.concat(f.related_ids)
        }
        file_ids.push(f.file_id)
      });

      this.FilesService.downloadManifest(file_ids);
    }

  }

  class LoginToDownloadController {
    constructor (private $modalInstance) {}

    cancel() :void {
      this.$modalInstance.close(false);
    }

    goAuth() :void {
      this.$modalInstance.close(true);
    }
  }

  angular
      .module("cart.controller", [
        "cart.services",
        "core.services",
        "user.services",
        "cart.table.model"
      ])
      .controller("LoginToDownloadController", LoginToDownloadController )
      .controller("CartController", CartController);
}

