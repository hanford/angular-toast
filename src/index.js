var angular = require('angular')

module.exports = angular
  .module('angular-toast', [])
  .factory('toast', ngToast)
  .name

ngToast.$inject = ['$document', '$compile', '$rootScope', '$controller', '$timeout']

function ngToast ($document, $compile, $rootScope, $controller, $timeout) {
  var container = angular.element('<div class="toast-container"></div>')
  var body = $document.find('body')

  body.append(container)

  return {
    show: show
  }

  function show (text, timeout) {
    var toast = angular.element('<div class="toast" ng-click="killme($event)">' + text + '</div>')

    var scope = $rootScope.$new()

    scope.killme = function (event) {
      var element = event.target

      element.classList.remove('flyIn')
      element.classList.add('flyOut')

      $timeout(function () {
        element.remove()
      }, 200)
    }

    timeout = (timeout || 4000)

    $compile(toast)(scope)

    // Attach compiled toast to DOM
    container.append(toast)

    $timeout(function () {
      toast.addClass('flyIn')
    }, 0)

    return $timeout(function () {
      toast.removeClass('flyIn')
      toast.addClass('flyOut')

      $timeout(function () {
        toast.remove()
      }, 200)

    }, timeout)
  }
}
